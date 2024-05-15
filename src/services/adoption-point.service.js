import { prisma } from '../../config/db-connect.js'

const adoptionPointService = {
    get: async (skip = 0, take = 100) => {
        return await prisma.adoptionPoint.findMany({
            skip,
            take
        })
    },

    getById: async (id) => {
        return await prisma.adoptionPoint.findUnique({ where: {id: parseInt(id)}})
    },

    getByAdoptionPointIdAndGroupId: async (adoptionPointId, groupId) => {
        return await prisma.adoptionPoint.findFirst({ 
            where: { id: parseInt(adoptionPointId), groupId }})
    },

    create: async(adoptionPoint) => {
        return await prisma.adoptionPoint.create({ data: adoptionPoint })
    },

    updateById: async(id, props) => {
        return await prisma.adoptionPoint.update({
            where: { id: parseInt(id) },
            data: props
        })
    },

    delete: async (id) => {
        return await prisma.adoptionPoint.delete({ where: { id: parseInt(id) } })
    },

    getByName: async(name) => {
        return await prisma.adoptionPoint.findUnique({ where: { name }})
    }

}

export default adoptionPointService