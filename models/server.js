const express = require('express');
const httpServer = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = httpServer.createServer(this.app);
		this.io = socketIo(this.server);
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	}

	socketsConfg() {
		new Sockets(this.io);
	}

	execute() {
		this.middlewares();

		this.socketsConfg();

		this.server.listen(this.port, () => console.log('SocketServer On', this.port));
	}
}

module.exports = Server;
