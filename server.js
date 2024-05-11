import app from './src/app.js'
import { prisma } from './config/db-connect.js'

import dotenv from 'dotenv'

dotenv.config()

try {
    if (!prisma.$isConnected) {
        await prisma.$isConnected
        console.log('🗃️  Success to connect on db')
    }
}

catch (error) { console.error(error) }

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`🐶 Server listen on port ${port}`))