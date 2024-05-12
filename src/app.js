import express from 'express'
import cors from 'cors'
import { routes } from './routes/index.js'

const app = express()

app.use(cors())
routes(app)

export default app