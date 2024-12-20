import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { parse } from 'url'
import next from 'next'
import path from 'path'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const app = next({ dir: dirname, dev: true })
const handle = app.getRequestHandler()

await app.prepare()

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url!, true)
  handle(req, res, parsedUrl)
})

server.listen(3000)
