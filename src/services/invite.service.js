import { prisma } from '../../config/db-connect.js'

const inviteService = {
    create: async (invite) => {
        return await prisma.invite.create({ data: invite })
    }
}

export default inviteService

