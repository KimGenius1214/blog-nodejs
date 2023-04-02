// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object.<*, *> | undefined) => Promise<*>} callback
 */

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef CreatePostBody
 * @property {string} title
 * @property {string} content
 */

const fs = require('fs')

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile('database.json', 'utf-8')
  return JSON.parse(json).posts
}

/** @param {Post[]} posts */
async function savePosts(posts) {
  const content = {
    posts,
  }

  return fs.promises.writeFile(
    'database.json',
    JSON.stringify(content),
    'utf-8'
  )
}

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      return {
        statusCode: 200,
        body: await getPosts(),
      }
    },
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      const posts = await getPosts()

      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'bad request',
        }
      }

      /** @type {string} */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      posts.push(newPost)
      savePosts(posts)

      return {
        statusCode: 200,
        body: {},
      }
    },
  },
]

module.exports = {
  routes,
}
