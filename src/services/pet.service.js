import { prisma } from './../../config/db-connect.js'

const petService = {
    get:async(skip = 0, take = 100) => {
        const pets = await prisma.pet.findMany({skip, take})

        if (!pets || !pets.length) {
            return []
        }

        for (const pet of pets) {
            const adoptionPoint = await prisma.adoptionPoint.findFirst({ where: { id: pet.adoptionPointId } })
            const group = await prisma.group.findFirst({ 
                where: { id: adoptionPoint.groupId },
                include: {
                    socialMedia: true,
                }
            })

            pet.adoptionPoint = adoptionPoint
            pet.group = group
        }

        return pets
    },

    getByAdoptionPointId: async(adoptionPointId, skip = 0, take = 100) => {
        return await prisma.pet.findMany({
            where: { adoptionPointId: parseInt(adoptionPointId) },
            skip,
            take
        })
    },

    getByGroupId: async(groupId, skip = 0, take = 100) => {
        const pets = await prisma.pet.findMany({
            where: {
                adoptionPoint: {
                    groupId: parseInt(groupId)
                }
            },
            skip, 
            take
        })


        if (!pets || !pets.length) {
            return []
        }

        for (const pet of pets) {
            const adoptionPoint = await prisma.adoptionPoint.findFirst({ where: { id: pet.adoptionPointId } })
            const group = await prisma.group.findFirst({
                where: { id: adoptionPoint.groupId },
                include: {
                    socialMedia: true,
                }
            })

            pet.adoptionPoint = adoptionPoint
            pet.group = group
        }

        return pets
    },

    getById: async(id) => {
        const pet = await prisma.pet.findUnique({ where: { id: parseInt(id) }})

        if (!pet) {
            return
        }

        const adoptionPoint = await prisma.adoptionPoint.findFirst({ where: { id: pet.adoptionPointId }})
        const group = await prisma.group.findFirst({
            where: { id: adoptionPoint.groupId },
            include: {
                socialMedia: true,
            }
        })

        return { ...pet, group, adoptionPoint }
    },

    getByGroupIdAndPetId: async (groupId, petId) => {
        return await prisma.pet.findFirst({
            where: {
                id: parseInt(petId),
                adoptionPoint: {
                    groupId: parseInt(groupId)
                }
            }
        })
    },

    getByParams: async (params, skip = 0, take = 100) => {
        let pets
        
        if (params.addressCity) {
            const addressCity = params.addressCity
            delete params.addressCity

            pets = await prisma.pet.findMany({
                where: { 
                    ...params,
                    adoptionPoint: {
                        addressCity: addressCity
                    }
                },
                include: {
                  adoptionPoint: true  
                },
                skip,
                take
            })
        }

        else {
            pets = await prisma.pet.findMany({ 
                where: { ...params },
                skip, 
                take
            })
        }


        if (!pets || !pets.length) {
            return []
        }

        for (const pet of pets) {
            const adoptionPoint = await prisma.adoptionPoint.findFirst({ where: { id: pet.adoptionPointId } })
            const group = await prisma.group.findFirst({
                where: { id: adoptionPoint.groupId },
                include: {
                    socialMedia: true,
                }
            })
            
            pet.adoptionPoint = adoptionPoint
            pet.group = group
        }

        return pets
    },
    
    create: async(pet) => {
        const newPet = await prisma.pet.create({data: pet})

        const adoptionPoint = await prisma.adoptionPoint.findFirst({ where: { id: pet.adoptionPointId } })
        const group = await prisma.group.findFirst({
            where: { id: adoptionPoint.groupId },
            include: {
                socialMedia: true,
            }
        })

        newPet.adoptionPoint = adoptionPoint
        newPet.group = group

        return newPet
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