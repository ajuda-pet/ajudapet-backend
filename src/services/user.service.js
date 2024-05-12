import { prisma } from '../../config/db-connect.js'

const userService = {
    getById: async (id) => {
        return await prisma.user.findUnique({ where: { id }})
    },

    getByEmail: async (email) => {
        return await prisma.user.findUnique({ where: { email: email }})
    },

    getByCpf : async (cpf) => {
        return await prisma.user.findUnique({ where: { cpf: cpf }})
    },

    create: async (user) => {
        return await prisma.user.create({ data: user })
    }
}

export default userService