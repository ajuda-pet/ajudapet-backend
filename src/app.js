import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressAnalytics } from 'node-api-analytics'
import { routes } from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '50mb'}))
app.use(cors())


if (process.env.ENV === 'prod') {
    app.use(expressAnalytics(process.env.ANALYTICS_KEY))
}

routes(app)

export default app