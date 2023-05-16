const socketIo = require('socket.io');

class SocketManager {
    constructor(server) {
        this.io = socketIo(server);
        this.connections = new Map();
    }

    init() {
        this.io.on('connection', (socket) => {
            socket.on('subscribe', (projectId) => {
                this.subscribe(socket, projectId);
            });

            socket.on('unsubscribe', (projectId) => {
                this.unsubscribe(socket, projectId);
            });

            socket.on('disconnect', () => {
                this.disconnect(socket);
            });
        });
    }

    subscribe(socket, id, type) {
        const key = `${type}-${id}`;

        if (this.connections.has(key)) {
            this.connections.get(key).add(socket.id);
        } else {
            this.connections.set(key, new Set([socket.id]));
        }

        socket.join(key);
    }

    unsubscribe(socket, id, type) {
        const key = `${type}-${id}`;

        if (this.connections.has(key)) {
            this.connections.get(key).delete(socket.id);
        }

        socket.leave(key);
    }

    disconnect(socket) {
        this.connections.forEach((sockets, projectId) => {
            if (sockets.has(socket.id)) {
                sockets.delete(socket.id);
            }
        });
    }

    notify(projectId, event, data) {
        this.io.to(projectId).emit(event, data);
    }
}

module.exports = SocketManager;
