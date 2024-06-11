const authenticationController = {
    isAuthenticate: (request, response) => {
        try {
            return response.status(200).send(true)
        }

        catch (error) {
            console.error(error)
        }
    }
}

export default authenticationController