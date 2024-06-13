import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { routes } from './routes/index.js'

const app = express()

if (process.env.ENV === 'prod') {
    expressAnalytics(process.env.ANALYTICS_KEY) 
}

app.use(bodyParser.json({ limit: '50mb'}))
app.use(cors())


routes(app)

export default app