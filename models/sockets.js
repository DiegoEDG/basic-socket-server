const BandList = require('./bandList');

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();

		this.socketsEvents();
	}

	socketsEvents() {
		this.io.on('connection', (socket) => {
			console.log('Server connected');

			socket.emit('bandList', this.bandList.getBands());

			socket.on('voteBand', (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit('bandList', this.bandList.getBands());
			});

			socket.on('removeBand', (id) => {
				this.bandList.removeBand(id);
				this.io.emit('bandList', this.bandList.getBands());
			});

			socket.on('addBand', (name) => {
				this.bandList.addBand(name);
				this.io.emit('bandList', this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;
