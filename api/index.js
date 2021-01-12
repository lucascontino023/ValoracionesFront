import express from 'express'
import axios from 'axios'
import { resolve } from 'path'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

const fs = require('fs')

router.get('/valoraciones', async (req, res, next) => {
  const path = './static/data/reviews.json'

  let rawdata = fs.readFileSync(path)
  let data = JSON.parse(rawdata)

  return res.json(data)
})

router.get('/test', async (req, res, next) => {
  const path = './static/data/test.json'

  let rawdata = fs.readFileSync(path)
  let data = JSON.parse(rawdata)

  return res.json(data)
})

// Export the server middleware
export default {
  path: '/api',
  handler: router,
}
