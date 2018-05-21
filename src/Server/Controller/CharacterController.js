export default class CharacterController {
	constructor(req, res) {
		this.request = req;
		this.response = res;
	}

	getCharacters() {
		const characters = this.request.app.get('characters');
		const classes = this.request.app.get('classes');
		const races = this.request.app.get('races');

		const toSend = characters.map((character) => {

			return {
				id: character.id,
				name: character.character.name,
				race: races[0][character.character.race_id].name,
				level: character.character.level,
				class: classes[character.character.class_id].name,
				stats: character.character.stats
			}
		})
		this.response.send(toSend);
	}

	createCharacter() {
		if (this.request.body !== {}) {
			const characters = this.request.app.get('characters');
			const id = this.request.app.get('charId');
			console.log(this.request.body)
			characters.push({
				id,
				character: this.request.body
			});
			this.request.app.set('characters', characters);
			this.request.app.set('charId', id + 1);
			return this.response.status(201).send({
				text: 'Success!',
				charId: id
			});
		}
		return this.response.status(400).send('No data!');
	}

	getRaces() {
		this.response.send(this.request.app.get('races'));
	}

	getClasses() {
		this.response.send(this.request.app.get('classes'));
	}

	getItems() {
		this.response.send(this.request.app.get('items'));
	}

	getWeapons() {
		this.response.send(this.request.app.get('items').weapon);
	}

	getArmor() {
		this.response.send(this.request.app.get('items').armor);
	}

	getCharacter() {
		const characters = this.request.app.get('characters');
		const characterIndex = characters.findIndex(character => character.id === Number(this.request.params.id))

		this.response.send(characters[characterIndex])
	}

	updateCharacter() {
		const characters = this.request.app.get('characters');
		const characterIndex = characters.findIndex(character => character.id === Number(this.request.query.id))
		const character = characters[characterIndex]

		character.character = this.request.body;


		this.response.send('Success?')
	}

	deleteCharacter() {
		const characters = this.request.app.get('characters');
		const characterIndex = characters.findIndex(character => character.id === Number(this.request.query.id))
		characters.splice(characterIndex, 1)


		this.response.send('Success?')
	}

}