import groupCreateSchema from '../schemas/group.schema.js'
import groupService from '../services/group.service'

const groupController = {
    get: async(request, response) => {
        try {
            const groups = await groupService.get()
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor'})
        }
    },

}

export default groupController