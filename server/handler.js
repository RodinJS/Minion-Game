/**
 * Created by xgharibyan on 1/12/17.
 */
const APIError = require('./APIError');
const httpStatus = require('./httpStatus');
const fs = require('fs');
const _ = require('lodash');


function serverFile(req, res) {
    const socketIO = fs.readFileSync(`${__dirname}/../node_modules/socket.io-client/dist/socket.io.js`, 'utf8');
    const clinetJS = fs.readFileSync(`${__dirname}/transpile/client.js`, 'utf8');
    const content = socketIO + clinetJS;
    res.setHeader('content-type', 'text/javascript');
    return res.send(content)
}
module.exports = {serverFile};