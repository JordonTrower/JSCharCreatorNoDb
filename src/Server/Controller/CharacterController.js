import axios from 'axios';

export default class CharacterController {
	constructor(req, res) {
		this.request = req;
		this.response = res;
	}

	createCharacter() {
		if (this.request.body !== {}) {
			const characters = this.request.app.get('characters');
			let id = this.request.app.get('charId');
			characters.push({
				id: id++,
				character: this.request.body
			})
			this.request.app.set('characters', characters)
			this.request.app.set('charId', id);
			console.log(this.request.app.get('characters'))
		}
	}

	getRaces() {

		this.response.send(this.request.app.get('races'));

	}
}