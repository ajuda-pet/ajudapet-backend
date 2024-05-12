import { prisma } from '../../config/db-connect.js'

const userOngService = {
    create: async(userOng) => {
        return await prisma.userOng.create({ data: userOng })
    }
}

export default userOngService