import express from 'express'
import signinRouter from './noauth/signup.router.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signinRouter)
}

export { routes }