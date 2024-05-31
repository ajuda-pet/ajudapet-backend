import { prisma } from '../../config/db-connect.js';

const pixService = {
    get: async () => {
        return await prisma.pix.findMany()
    },

    getById: async (pixId) => {
        return await prisma.pix.findUnique({ where: { id: parseInt(pixId) }})
    },


    getByGroupId: async (groupId, skip = 0, take = 100) => {
        return await prisma.pix.findFirst({
            where: { groupId: parseInt(groupId) },
            skip,
            take,
        });
    },

    getByIdAndGroupId: async (id, groupId) => {
        return await prisma.pix.findFirst({
            where: {
                id: parseInt(id),
                groupId: parseInt(groupId),
            },
        });
    },

    getByKeyAndGroupId: async (key, groupId) => {
        return await prisma.pix.findFirst({
            where: {
                key,
                groupId: parseInt(groupId),
            },
        });
    },

    create: async (pixData) => {
        return await prisma.pix.create({ data: pixData })
    },

    updateByIdAndGroupId: async (id, groupId, data) => {
        return await prisma.pix.update({
            where: {
                id: parseInt(id),
                groupId: parseInt(groupId),
            },
            data,
        });
    },

    deleteById: async (id) => {
        return await prisma.pix.delete({ where: { id: parseInt(id) }})
    }
}

export default pixService
