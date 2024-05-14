import jwt from 'jsonwebtoken'
import groupService from '../../services/group.service.js'

const authorizationMiddleware = (request, response, next) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = request.headers.authorization || request.headers.Authorization

    if (!token) {
        return response.status(401).send({ success: false, message: 'Token is required' })
    }

    jwt.verify(token, secretKey, async (error, decoded) => {
        if (error) {
            return response.status(403).send({ success: false, message: error })
        }

        const group = await groupService.getById(decoded.groupId)

        if (!group) {
            return response.status(403).send({ success: false, message: 'Invalid token' })
        }

        request.group = group
        return next()
    })
}

export default authorizationMiddleware