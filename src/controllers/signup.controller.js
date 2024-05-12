import { encryptPassword } from '../libraries/password-crypto.js'
import { userCreateSchema } from '../schemas/user.schema.js'
import userService from '../services/user.service.js'

const signupController = {
    create: async (request, response) =>  {
        try {
            const { error, value: payload } = userCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const userByEmail = await userService.getByEmail(payload.email)
            const userByCpf = await userService.getByCpf(payload.cpf)

            if (userByEmail) {
                return response.status(409).send({ success: false, message: 'Usuário já existe.'})
            }

            if (userByCpf) {
                return response.status(409).send({ success: false, message: 'CPF já está cadastrado.'})
            }

            const passwordHashed = await encryptPassword(payload.password)
            await userService.create({...payload, password: passwordHashed})

            return response.status(201).send({ success: true, message: 'Usuário criado com sucesso.'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default signupController