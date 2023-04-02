// @ts-check

// 프레임 워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데티어베이스로 활용할 예정(JSON)
 * - 인증 로직은 넣지 않습니다.
 * - RESTful API를 사용합니다.
 */

const http = require('http')
const { routes } = require('./api')
/**
 * POST
 *
 * GET /posts
 * GET /posts:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.findIndex(
      (r) =>
        req.url && req.method && r.url.test(req.url) && r.method === req.method
    )

    if (!route) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    // @ts-ignore
    const result = await route.callback()
    res.statusCode = result.statusCode
    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }
  main()

  //   const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  //   const postIdRegexResult =
  //     (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined
  //   if (req.url === '/posts' && req.method === 'GET') {
  //     const result = {
  //       posts: posts.map((post) => ({
  //         id: post.id,
  //         title: post.title,
  //       })),
  //       totalCount: posts.length,
  //     }
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8')
  //     res.end(JSON.stringify(result))
  //   } else if (postIdRegexResult && req.method === 'GET') {
  //     // GET /posts/:id
  //     const postId = postIdRegexResult[1]
  //     const item = posts.find((post) => post.id === postId)
  //     if (item) {
  //       res.statusCode = 200
  //       res.setHeader('Content-Type', 'application/json; encoding=utf-8')
  //       res.end(JSON.stringify(item))
  //     } else {
  //       res.statusCode = 404
  //       res.end('Not found')
  //     }
  //   } else if (req.url === '/posts' && req.method === 'POST') {
  //     req.setEncoding('utf-8')
  //     req.on('data', (data) => {
  //       /** @typedef CreatePostBody
  //        * @property {string} title
  //        * @property {string} content
  //        */
  //       /** @type {CreatePostBody} */
  //       const body = JSON.parse(data)
  //       posts.push({
  //         id: body.title.toLowerCase().replace(/\s/g, ''),
  //         title: body.title,
  //         content: body.content,
  //       })
  //       console.log(body)
  //     })
  //     res.statusCode = 200
  //     res.end('create')
  //   } else {
  //     res.statusCode = 404
  //     res.end('Not found')
  //   }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`PORT : ${PORT}`)
})
