import { prisma } from '../../config/db-connect.js'

const groupService = {
    get: async (skip = 0, take = 100) => {
        return await prisma.group.findMany({ 
            include: {
                socialMedia: true,
                adoptionPoints: true
            },
            skip, 
            take 
        })
    },

    getById: async(id) => {
        return await prisma.group.findUnique({ 
            where: { id: parseInt(id) },
            include: {
                socialMedia: true,
                adoptionPoints: true
            }
        })
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
          where: { id },
          data: props
        })
    },

    delete: async (id) => {
        return await prisma.group.delete({ where: { id }})
    }
}

export default  groupService