import { prisma } from './../../config/db-connect.js'

const petService = {
    get:async(skip = 0, take = 100) => {
        return await prisma.pet.findMany({skip, take})
    },

    getByAdoptionPointId: async(adoptionPointId, skip = 0, take = 100) => {
        return await prisma.pet.findMany({
            where: { adoptionPointId: parseInt(adoptionPointId) },
            skip,
            take
        })
    },

    getByGroupId: async(groupId, skip = 0, take = 100) => {
        return await prisma.pet.findMany({
            where: {
                adoptionPoint: {
                    groupId: parseInt(groupId)
                }
            },
            skip, 
            take
        })
    },

    getById: async(id) => {
        return await prisma.pet.findUnique({ where: {id: parseInt(id)} })
    },

    getByGroupIdAndPetId: async (groupId, petId) => {
        return await prisma.pet.findUnique({
            where: {
                id: parseInt(petId),
                adoptionPoint: {
                    id: parseInt(groupId)
                }
            }
        })
    },

    getByParam: async (param, skip = 0, take = 100) => {
        return await prisma.pet.findMany({ 
            where: { param },
            skip, 
            take
        })
    },
    
    create: async(pet) => {
        return await prisma.pet.create({data: pet})
    },

    updateById: async (id, props) => {
        return await prisma.pet.update({
            where: { id: parseInt(id) },
            data: props
        })
    },

    delete: async(id) => {
        return await prisma.pet.delete({
            where: { id: parseInt(id) }
        })
    }
}

export default petService