import { groupUpdateSchema } from '../schemas/group.schema.js'
import groupService from '../services/group.service.js'

const groupController = {
    get: async (request, response) => {
        try {
            const { name, cpfCnpj, email } = request.query
            
            if (name) {
                const group = await groupService.getByName(name)
                return response.status(200).send({ success: true, info: { group }, message: 'Query executada com sucesso. 😸' })
            }

            if (cpfCnpj) {
                const group = await groupService.getByCpfCnpj(cpfCnpj)
                return response.status(200).send({ success: true, info: { group }, message: 'Query executada com sucesso. 😸' })
            }

            if (email) {
                const group = await groupService.getByEmail(email)
                return response.status(200).send({ success: true, info: { group }, message: 'Query executada com sucesso. 😸' })
            }

            const groups = await groupService.get()

            groups.forEach(group => {
                group.pix = group.pix[0]
            })

            return response.status(200).send({ success: true, info: { groups }, message: 'Query executada com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    },

    getById: async (request, response) => {
        try {
            const { id } = request.params
            const group = await groupService.getById(id)

            if (!group) {
                return response.status(404).send({ success: false, message: 'Grupo não encontrado. 😿'})
            }

            group.pix = group.pix[0]
            return response.status(200).send({ succes: true, info: { group }, message: 'Query executado com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    },

    update: async (request, response) => {
        try {
            const { group } = request
            const { error, value: payload } = groupUpdateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const [groupByEmail, groupByCpf, groupByName] = await Promise.all([
                groupService.getByEmail(payload.email || ''),
                groupService.getByCpfCnpj(payload.cpfCnpj || ''),
                groupService.getByName(payload.name || '')
            ])

            if (groupByEmail) {
                return response.status(409).send({ success: false, message: 'Email já cadastrado. 😿' })
            }

            if (groupByCpf) {
                return response.status(409).send({ success: false, message: 'CPF já cadastrado. 😿' })
            }

            if (groupByName) {
                return response.status(409).send({ success: false, message: 'Nome de grupo já cadastrado. 😿' })
            }

            const updates = await groupService.updatedById(group.id, payload)
            const newGroup = { ...group, ...updates }

            newGroup.pix = newGroup.pix[0]

            return response.status(200).send({ success: true, info: { group: newGroup }, message: 'Query executada com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    },

    delete: async (request, response) => {
        try {
            const { id } = request.group
            await groupService.delete(id)

            return response.status(204).send({ success: true, message: 'Grupo deletado com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    }
}

export default groupController