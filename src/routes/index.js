import express from 'express'
import signupRouter from './noauth/signup.router.js'
import signinRouter from './noauth/signin.router.js'
import authorizationMiddleware from './auth/authorization-midleware.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signupRouter, signinRouter)
    app.use('/auth', authorizationMiddleware)
}

export { routes }