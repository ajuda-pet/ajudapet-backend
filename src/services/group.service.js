import { prisma } from '../../config/db-connect.js'

const groupService = {
    get: async () => {
        return await prisma.group.findMany()
    },

    getById: async(id) => {
        return await prisma.group.findUnique({ where: { id: parseInt(id, 10) }})
    },

    create: async (group) => {
        return await prisma.group.create({ data: group })
    },

    getByEmail: async(email) => {
        return await prisma.group.findUnique({ where: {email} })
    },

    getByName: async(name) => {
        return await prisma.group.findUnique({ where: {name} })
    },

    getByCpf: async(cpf) => {
        return await prisma.group.findUnique({ where: {cpf} })
    },

    updatedById: async (id, props) => {
      return await prisma.group.update({ 
        where: { id: parseInt(id, 10) },
        data: props
      })
    }
}

export default  groupService