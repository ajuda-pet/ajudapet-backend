import { prisma } from '../../config/db-connect.js'

const socialMediaService = {
    getByGroupIdAndPlataform: async (groupId, plataform) => {
        return await prisma.socialMedia.findFirst({
            where: { groupId, plataform },
        })
    },

    create: async (socialMedia) => {
        return await prisma.socialMedia.create({ data: socialMedia })
    },

    updateById: async (id, plataform, props) => {
        return await prisma.socialMedia.update({
            where: { id: parseInt(id), plataform },
            data: props
        })
    },

    delete: async(id) => {
        return await prisma.socialMedia.delete({ where: { id }})
    }
}

export default socialMediaService