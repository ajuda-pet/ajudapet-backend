import jwt from 'jsonwebtoken'
import { verifyPassword } from '../libraries/password-crypto.js'
import groupService from '../services/group.service.js'

const signinController = {
    signin: async (request, response) => {
        try {
            const { email, password } = request.body
    
            if (!email || !password) {
                return response.status(400).send({ success: false, message: 'Email ou senha não informado. 😿' })
            }
            
            const group = await groupService.getByEmail(email)
    
            if (!group) {
                return response.status(404).send({ success: false, message: 'Grupo não encontrado. 😿' })
            }
    
            const authorizedPassword = await verifyPassword(password, group.password)
    
            if (!authorizedPassword) {
                return response.status(401).send({ success: false, message: 'Senha inválida. 😿'})
            }

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ groupId: group.id }, secretKey, { expiresIn: '72h' });

            return response.status(200).send({ success: true, info: { token }, message: 'Grupo logado com sucesso. 😸' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    }
}

export default signinController