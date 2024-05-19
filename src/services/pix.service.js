import { prisma } from '../../config/db-connect.js';

const pixService = {
    getByGroupId: async (group_id, skip = 0, take = 100) => {
        return await prisma.pix.findMany({
            where: { group_id: parseInt(group_id) },
            skip,
            take,
        });
    },

    getByIdAndGroupId: async (id, group_id) => {
        return await prisma.pix.findFirst({
            where: {
                id: parseInt(id),
                group_id: parseInt(group_id),
            },
        });
    },

    getByKeyAndGroupId: async (key, group_id) => {
        return await prisma.pix.findFirst({
            where: {
                key,
                group_id: parseInt(group_id),
            },
        });
    },

    create: async (pixData) => {
        return await prisma.pix.create({ data: pixData });
    },

    updateByIdAndGroupId: async (id, group_id, data) => {
        return await prisma.pix.updateMany({
            where: {
                id: parseInt(id),
                group_id: parseInt(group_id),
            },
            data,
        });
    },

    deleteByIdAndGroupId: async (id, group_id) => {
        return await prisma.pix.deleteMany({
            where: {
                id: parseInt(id),
                group_id: parseInt(group_id),
            },
        });
    },
};