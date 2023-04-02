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
 * @property {() => Promise<*>} callback
 */

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'first_post',
    title: 'first',
    content: '하위',
  },
  {
    id: 'second_post',
    title: 'second',
    content: 'hello2',
  },
]

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      return {
        statusCode: 200,
        body: {},
      }
    },
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => ({
      statusCode: 200,
      body: {},
    }),
  },
]

module.exports = {
  routes,
}
