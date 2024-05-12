import { prisma } from '../../config/db-connect.js'

const ongService = {
    get: async () => {
        return await prisma.ong.findMany()
    },

    getById: async(id) => {
        const numberId = parseInt(id, 10)
        return await prisma.ong.findUnique({ where: { id: numberId }})
    },

    create: async (ong) => {
        return await prisma.ong.create({ data: ong })
    },

    getByEmail: async (email) => {
        return await prisma.ong.findUnique({ where: { email}})
    },

    getByName: async (name) => {
        return await prisma.ong.findUnique({ where: { name }})
    }
}

export default ongService