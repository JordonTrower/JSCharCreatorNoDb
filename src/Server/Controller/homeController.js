export default class HomeController {
	constructor(req, res) {
		this.request = req;
		this.response = res;

	}

	getItems() {
		this.response.send([])
	}

}