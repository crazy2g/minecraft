const { Route, MinecraftUtils } = require('../index')
const { Router } = require('express')

module.exports = class Minecraft extends Route {
  constructor (client) {
    super(client)
    this.name = 'minecraft'
  }

  load () {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({ endpoints: [ 'GET /ping', 'GET /avatar/:user' ] })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/avatar/:user', async (req, res) => {
      if (!req.params.user) return res.status(400).json({ message: 'You need to specify a user to grab the avatar from' })
      else {
        const avatar = await MinecraftUtils.getAvatar(req.params.user)
        res.status(200).set('Content-Type', 'image/png').send(avatar)
      }
    })

    return router
  }
}