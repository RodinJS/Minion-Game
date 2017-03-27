'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scripts = document.getElementsByTagName('script');
var index = scripts.length - 1;
var myScript = scripts[index];
var params = parseQuery(myScript.src.replace(/^[^\?]+\??/, ''));
var Debug = 'debug' in params || false;
var host = params.host || 'http://localhost:3010';
params.projectId = 'minionGame';

var RodinSocket = function () {
    function RodinSocket(ns, host) {
        _classCallCheck(this, RodinSocket);

        this.emitBuffer = {};
        this.listenerBuffer = {};
        RodinSocket.disconnected = RodinSocket.disconnected.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.broadcastToAll = this.broadcastToAll.bind(this);
        this.subscribeToEvents = this.subscribeToEvents.bind(this);
        this.getConnectedUsersList = this.getConnectedUsersList.bind(this);
        this.sendMessageToUser = this.sendMessageToUser.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.broadcastToRoom = this.broadcastToRoom.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.connect = this.connect.bind(this);
        this.reconnect = this.reconnect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.onConnected = this.onConnected.bind(this);
        this.setData = this.setData.bind(this);
        this.mySocketId = this.mySocketId.bind(this);
        this.isMe = this.isMe.bind(this);
        this.validateSocketConnection = this.validateSocketConnection.bind(this);
    }

    _createClass(RodinSocket, [{
        key: 'connect',
        value: function connect(data) {
            var _this = this;

            data = toQueryString(data);

            this.subscribe().then(function (response) {
                console.log('response', response.data);
                _this.ns = response.data.ns;
                _this.host = params.host;
                debug('NS SETTINGS', [_this.ns, params, host]);
                _this.Socket = io(host + '/' + _this.ns, {
                    query: data,
                    resource: "socket.io"
                    //transports: ['websocket', 'polling']
                });
                return _this.subscribeToEvents();
            }).catch(function (error) {
                console.log(error);
                _this.emitBuffer = {};
                _this.listenerBuffer = {};
            });
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.Socket.disconnect();
        }
    }, {
        key: 'mySocketId',
        value: function mySocketId() {
            return this.Socket.id;
        }
    }, {
        key: 'isMe',
        value: function isMe(data) {
            if (data.socketId == this.Socket.id) return true;
            return false;
        }
    }, {
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this2 = this;

            this.Socket.on('connect', function (socket) {
                return _this2.connected(socket);
            });
            this.Socket.on('subscribeToApp', this.subscribe);
            this.Socket.on('disconnect', RodinSocket.disconnected);
            //this.Socket.on('message', RodinSocket.onMessage);
            this.Socket.on('onError', RodinSocket.onError);
        }
    }, {
        key: 'reconnect',
        value: function reconnect() {
            this.Socket.connect();
        }
    }, {
        key: 'connected',
        value: function connected(socket) {
            if (Object.keys(this.listenerBuffer).length > 0) {
                for (var key in this.listenerBuffer) {
                    if (key == 'connection') {
                        this.listenerBuffer[key](this.Socket.connected);
                    } else {
                        this.Socket.on(key, this.listenerBuffer[key]);
                    }
                }
                this.listenerBuffer = {};
            }
            if (Object.keys(this.emitBuffer).length > 0) {
                for (var _key in this.emitBuffer) {
                    this.Socket.emit(_key, this.emitBuffer[_key]);
                }
                this.emitBuffer = {};
            }
            debug('connected', socket);
        }
    }, {
        key: 'onConnected',
        value: function onConnected(cb) {
            if (!this.Socket) {
                return this.listenerBuffer['connection'] = cb;
            }
            cb(this.Socket.connected);
        }
    }, {
        key: 'onMessage',
        value: function onMessage(eventName, cb) {
            if (!this.Socket) {
                return this.listenerBuffer[eventName] = cb;
            }
            this.Socket.on(eventName, cb);
            debug('individual message - ', data, false);
        }
    }, {
        key: 'broadcastToAll',
        value: function broadcastToAll(name, param) {
            var data = { event: name, data: param };
            if (this.validateSocketConnection('broadcastToAll', data)) {
                this.Socket.emit('broadcastToAll', data);
            }
        }
    }, {
        key: 'broadcastToRoom',
        value: function broadcastToRoom(eventName, params, roomName) {
            var data = { roomName: roomName, eventName: eventName || false, data: params };
            if (this.validateSocketConnection('broadcastToRoom', data)) {
                this.Socket.emit('broadcastToRoom', data);
            }
        }
    }, {
        key: 'sendMessageToUser',
        value: function sendMessageToUser(socketId, message) {
            var data = { event: 'sendMessageToUser', socketIds: socketId, message: message };
            if (this.validateSocketConnection('message', data)) {
                this.Socket.emit('message', data);
            }
        }
    }, {
        key: 'setData',
        value: function setData(data) {
            if (this.validateSocketConnection('setData', data)) {
                this.Socket.emit('setData', data);
            }
        }
    }, {
        key: 'getConnectedUsersList',
        value: function getConnectedUsersList() {
            if (this.validateSocketConnection('getConnectedUsersList', {})) {
                this.Socket.emit('getConnectedUsersList', {});
            }
        }
    }, {
        key: 'joinRoom',
        value: function joinRoom(roomName, notifyAll) {
            var data = { roomName: roomName, notifyAll: notifyAll };
            if (this.validateSocketConnection('joinRoom', data)) {
                this.Socket.emit('joinRoom', data);
            }
        }
    }, {
        key: 'leaveRoom',
        value: function leaveRoom(roomName, notifyAll) {
            var data = { roomName: roomName, notifyAll: notifyAll };
            if (this.validateSocketConnection('leaveRoom', data)) {
                this.Socket.emit('leaveRoom', data);
            }
        }
    }, {
        key: 'getRooms',
        value: function getRooms() {
            if (this.validateSocketConnection('getRooms', {})) {
                this.Socket.emit('getRooms', {});
            }
        }
    }, {
        key: 'deleteRoom',
        value: function deleteRoom(roomName) {
            var data = { roomName: roomName };
            if (this.validateSocketConnection('deleteRoom', data)) {
                this.Socket.emit('deleteRoom', data);
            }
        }
    }, {
        key: 'subscribe',
        value: function subscribe() {
            var url = host + '/subscribe';
            var method = 'POST';
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open(method, url);
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                req.onload = function () {
                    return req.status === 200 ? resolve(JSON.parse(req.response)) : reject(Error(req.statusText));
                };
                req.onerror = function (e) {
                    return reject(Error('Network Error: ' + e));
                };
                req.send(JSON.stringify(params));
            });
        }
    }, {
        key: 'validateSocketConnection',
        value: function validateSocketConnection(eventName, data) {
            if (!this.Socket) {
                this.emitBuffer[eventName] = data;
                return false;
            }
            return true;
        }
    }], [{
        key: 'disconnected',
        value: function disconnected(err) {
            debug('disconnected', err);
        }
    }, {
        key: 'onError',
        value: function onError(data) {
            debug('Socket Request error', data, true);
        }
    }]);

    return RodinSocket;
}();

function parseQuery(queryString) {
    var query = {};
    var a = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function toQueryString(paramsObject) {
    return Object.keys(paramsObject).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObject[key]);
    }).join('&');
}

function debug(name, data, error) {
    if (Debug) {
        if (error) return console.error(name, data);

        return console.log(name, data);
    }
}

debug('PARAMS', params);