'use strict'

const { Router } = require('express')
  
const router = Router()

router.get('/.well-known/acme-challenge/:content', (req, res) => {
  res.send(`${req.params.content}.hZPQ8UhdGPeVfaXI2g7IIfxm20GiQgmoVJtZ3kT4Wg8`)
})
  
module.exports = router
