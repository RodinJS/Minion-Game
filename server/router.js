/**
 * Created by xgharibyan on 1/13/17.
 */

const express = require('express');
const handler = require('./handler');
const apiSockets = require('./apiSocket');
const router = express.Router();	// eslint-disable-line new-cap

router.get('/', (req, res) => res.render('../public/'));


router.route('/socket-server')
    .get(handler.serverFile);

router.route('/subscribe')
    .post(apiSockets.subscribe);

module.exports = router;


