class Sockets {
	constructor(io) {
		this.io = io;

		this.socketsEvents();
	}

	socketsEvents() {
		this.io.on('connection', (socket) => {
			socket.on('clientMsg', (data) => {
				console.log(data);

				this.io.emit('msgReturn', data);
			});
		});
	}
}

module.exports = Sockets;
