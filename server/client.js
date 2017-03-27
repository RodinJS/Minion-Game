const scripts = document.getElementsByTagName('script');
let index = scripts.length - 1;
let myScript = scripts[index];
const params = parseQuery(myScript.src.replace(/^[^\?]+\??/, ''));
let Debug = 'debug' in params || false;
const host = params.host  || 'http://localhost:3010';
params.projectId = 'minionGame';

class RodinSocket {

    constructor(ns, host) {
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

    connect(data) {
        data = toQueryString(data);

        this.subscribe().then((response) => {
            console.log('response', response.data);
            this.ns = response.data.ns;
            this.host = params.host;
            debug('NS SETTINGS', [this.ns, params, host]);
            this.Socket = io(`${host}/${this.ns}`, {
                query: data,
                resource: "socket.io"
                //transports: ['websocket', 'polling']
            });
            return this.subscribeToEvents();

        }).catch((error) => {
            console.log(error);
            this.emitBuffer = {};
            this.listenerBuffer = {};
        })

    }

    disconnect(){
        this.Socket.disconnect();
    }

    mySocketId(){
        return this.Socket.id
    }

    isMe(data){
        if(data.socketId == this.Socket.id) return true;
        return false;
    }

    subscribeToEvents() {
        this.Socket.on('connect', (socket) => this.connected(socket));
        this.Socket.on('subscribeToApp', this.subscribe);
        this.Socket.on('disconnect', RodinSocket.disconnected);
        //this.Socket.on('message', RodinSocket.onMessage);
        this.Socket.on('onError', RodinSocket.onError);
    }

    reconnect(){
       this.Socket.connect();
    }

    connected(socket) {
        if (Object.keys(this.listenerBuffer).length > 0) {
            for (let key in this.listenerBuffer) {
                if(key == 'connection'){
                    this.listenerBuffer[key](this.Socket.connected);
                }
                else{
                    this.Socket.on(key, this.listenerBuffer[key])
                }
            }
            this.listenerBuffer = {};
        }
        if (Object.keys(this.emitBuffer).length > 0) {
            for (let key in this.emitBuffer) {
                this.Socket.emit(key, this.emitBuffer[key]);
            }
            this.emitBuffer = {};
        }
        debug('connected', socket);
    }

    onConnected(cb){
        if (!this.Socket) {
            return this.listenerBuffer['connection'] = cb;
        }
        cb(this.Socket.connected);
    }

    static disconnected(err) {
        debug('disconnected', err);
    }

    onMessage(eventName, cb) {
        if (!this.Socket) {
            return this.listenerBuffer[eventName] = cb;
        }
        this.Socket.on(eventName, cb);
        debug('individual message - ', data, false);
    }

    static onError(data) {
        debug('Socket Request error', data, true);
    }

    broadcastToAll(name, param) {
        const data = {event: name, data: param};
        if (this.validateSocketConnection('broadcastToAll', data)) {
            this.Socket.emit('broadcastToAll', data);
        }
    }

    broadcastToRoom(eventName, params, roomName) {
        const data = {roomName: roomName, eventName: eventName || false, data: params};
        if (this.validateSocketConnection('broadcastToRoom', data)) {
            this.Socket.emit('broadcastToRoom', data);
        }
    }

    sendMessageToUser(socketId, message) {
        const data = {event: 'sendMessageToUser', socketIds: socketId, message: message};
        if (this.validateSocketConnection('message', data)) {
            this.Socket.emit('message', data);
        }
    }

    setData(data){
        if (this.validateSocketConnection('setData', data)) {
            this.Socket.emit('setData', data);
        }
    }

    getConnectedUsersList() {
        if (this.validateSocketConnection('getConnectedUsersList', {})) {
            this.Socket.emit('getConnectedUsersList', {});
        }
    }

    joinRoom(roomName, notifyAll) {
        const data = {roomName: roomName, notifyAll: notifyAll};
        if (this.validateSocketConnection('joinRoom', data)) {
            this.Socket.emit('joinRoom', data);
        }
    }

    leaveRoom(roomName, notifyAll) {
        const data = {roomName: roomName, notifyAll: notifyAll};
        if (this.validateSocketConnection('leaveRoom', data)) {
            this.Socket.emit('leaveRoom', data);
        }
    }

    getRooms() {
        if (this.validateSocketConnection('getRooms', {})) {
            this.Socket.emit('getRooms', {});
        }
    }

    deleteRoom(roomName) {
        const data = {roomName: roomName};
        if (this.validateSocketConnection('deleteRoom', data)) {
            this.Socket.emit('deleteRoom', data);
        }
    }

    subscribe() {
        const url = `${host}/subscribe`;
        const method = 'POST';
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open(method, url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = () => req.status === 200 ? resolve(JSON.parse(req.response)) : reject(Error(req.statusText));
            req.onerror = (e) => reject(Error(`Network Error: ${e}`));
            req.send(JSON.stringify(params));
        });
    }

    validateSocketConnection(eventName, data) {
        if (!this.Socket) {
            this.emitBuffer[eventName] = data;
            return false;
        }
        return true;
    }

}

function parseQuery(queryString) {
    let query = {};
    let a = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < a.length; i++) {
        let b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function toQueryString(paramsObject) {
    return Object
        .keys(paramsObject)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        .join('&');
}

function debug(name, data, error) {
    if (Debug) {
        if (error)
            return console.error(name, data);

        return console.log(name, data);
    }
}

debug('PARAMS', params);
