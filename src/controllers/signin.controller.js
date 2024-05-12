import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'
import { verifyPassword } from '../libraries/password-crypto.js'

const signinController = {
    signin: async (request, response) => {
        try {
            const { email, password } = request.body
    
            if (!email || !password) {
                return response.status(400).send({ success: false, message: 'Ops! Email ou senha não foi informado.' })
            }
            
            const user = await userService.getByEmail(email)
    
            if (!user) {
                return response.status(404).send({ success: false, message: 'Ops! Usuário não encontrado.' })
            }
    
            const authorizedPassword = await verifyPassword(password, user.password)
    
            if (!authorizedPassword) {
                return response.status(401).send({ success: false, message: 'Ops! Senha inválida.'})
            }

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '72h' });

            return response.status(200).send({ success: true, info: { token }, message: 'Usuário logado com sucesso.' })
        
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default signinController