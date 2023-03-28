// @ts-check

// 프레임 워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데티어베이스로 활용할 예정(JSON)
 * - 인증 로직은 넣지 않습니다.
 * - RESTful API를 사용합니다.
 */

const http = require('http')

/**
 * POST
 *
 * GET /posts
 * GET /posts:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.statusCode = 200
  res.end('hello')
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`PORT : ${PORT}`)
})
