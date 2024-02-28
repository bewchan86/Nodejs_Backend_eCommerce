'use strict';

const express = require('express');
const router = express.Router();

router.use('/v1/api',require('./access'))
// router.get('/', (req, res,next) => {
//     // const strCompress = 'Hello Fantipsjs'
//     return res.status(202).json({
//         message: "Wellcome Fantipjs",
//         // metadata: strCompress.repeat(10000)
//     })
// })

module.exports = router;