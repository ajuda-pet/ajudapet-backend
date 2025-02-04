import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { routes } from './routes/index.js'
import { expressAnalytics } from 'node-api-analytics'

const app = express()

if (process.env.ENV === 'prod') {
    app.use(expressAnalytics(process.env.ANALYTICS_KEY))
}

app.use(bodyParser.json({ limit: '50mb'}))
app.use(cors())


routes(app)

export default app