import jwt from 'jsonwebtoken'
import responseEmoji from './../libraries/response-emoji.js'

const inviteController = {
    get: (request, response) => {
        try {
            const { group } = request
            const inviteToken = jwt.sign({ email: group.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'} )
            
            return response.status(200).send({ success: true, info: { invite: inviteToken }, message: `Token criado ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error) 
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    }
}

export default inviteController