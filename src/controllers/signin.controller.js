import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'
import { verifyPassword } from '../libraries/password-crypto.js'

const signinController = {
    signin: async (request, response) => {
        try {
            const { email, password } = request.body
    
            if (!email || !password) {
                return response.status(400).send({ success: false, message: 'Email and password are required' })
            }
            
            const user = await userService.getByEmail(email)
    
            if (!user) {
                return response.status(404).send({ success: false, message: 'User not found' })
            }
    
            const authorizedPassword = await verifyPassword(password, user.password)
    
            if (!authorizedPassword) {
                return response.status(401).send({ success: false, message: 'Invalid password'})
            }

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ user }, secretKey, { expiresIn: '72h' });

            return response.status(200).send({ success: true, info: { token }, message: 'Success to signin user' })
        
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default signinController