export default class HomeController {
	constructor(req, res) {
		this.request = req;
		this.response = res;
		this.db = req.app.get('db');
	}

	getItems() {
		this.db('items')
			.select()
			.then(records => this.response.status(200).send(records));
	}

	getUsers() {
		this.db('characters')
			.select()
			.then(records => this.response.status(200).send(records));
	}
}
