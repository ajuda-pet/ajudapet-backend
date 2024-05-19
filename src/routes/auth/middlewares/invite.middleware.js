import jwt from 'jsonwebtoken'
import groupService from '../../../services/group.service.js'
import responseEmoji from '../../../libraries/response-emoji.js'

const inviteMiddleware = (request, response, next) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const { token } = request.query 

    if (!token) {
        return response.status(401).send({ success: false, message: `Token não informado. ${responseEmoji.fail}` })
    }

    jwt.verify(token, secretKey, async (error, decoded) => {

        if (error) {
            return response.status(403).send({ success: false, message: error })
        }

        const host = await groupService.getByEmail(decoded.email)

        if (!host) {
            return response.status(403).send({ success: false, message: `Invite inválido ${responseEmoji.fail}` })
        }

        request.hostId = host.id
        return next()
    })
}

export default inviteMiddleware