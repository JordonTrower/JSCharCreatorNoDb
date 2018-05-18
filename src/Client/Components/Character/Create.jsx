import React, { Component } from 'react';
import axios from 'axios';
import Feed from 'rss-to-json';
import StatList from './StatList';
import Button from '../Common/Button';
import InputBar from '../Common/InputBar';

const defaultStats = {
	Strength: 10,
	Constitution: 10,
	Dexterity: 10,
	Wisdom: 10,
	Intelligence: 10,
	Charisma: 10
};

class CharacterCreator extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			races: [],
			racialBonus: [],
			selectedRace: {},

			stats: defaultStats
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStatChange = this.handleStatChange.bind(this);
		this.randomizeStats = this.randomizeStats.bind(this);
	}

	componentDidMount() {
		axios({
			method: 'post',
			url: '/character/get-races',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(res => {
			this.setState({ races: res.data[0], racialBonus: res.data[1] });
		});
	}

	handleSubmit(event) {
		const currentStats = Object.assign({}, this.state.stats);
		const racialBonus = this.state.racialBonus[this.state.selectedRace];
		const race = this.state.races[this.state.selectedRace];

		Object.entries(currentStats).forEach(stat => {
			const statName = stat[0][0].toUpperCase() + stat[0].substr(1);

			currentStats[statName] += Number(
				this.racialMod(stat, race, racialBonus)
			);
		});

		axios({
			method: 'post',
			url: '/character/create',
			data: {
				name: this.state.name,
				race_id: this.state.selectedRace,
				stats: JSON.stringify(currentStats)
			}
		}).then(response => {
			console.log(response);
		});

		event.preventDefault();
	}

	handleStatChange(event) {
		const currentStats = this.state.stats;
		currentStats[event.target.id] = event.target.value;
		console.log(event.target);
		this.setState({ stats: currentStats });
	}

	racialMod(stat, race, bonus) {
		let string = 0;
		const statName = stat[0].toLowerCase();

		// Get racial mod
		if (race.name !== 'Human') {
			const stat = bonus.filter(bonus =>
				bonus.toLowerCase().includes(statName)
			);

			if (stat.length > 0) {
				string = stat[0].replace(/\D/g, '');
				// \D is shorthand for non didgits
			}
		} else {
			string = 1;
		}

		return string;
	}

	randomizeStats() {
		const currentStats = this.state.stats;

		Object.entries(currentStats).forEach(stat => {
			const randNumArray = Array.from(
				{ length: 4 },
				() => Math.floor(Math.random() * 6) + 1
			);

			const minNum = Math.min(...randNumArray);

			let foundLowest = false;

			currentStats[stat[0]] = randNumArray.reduce((total, num) => {
				if (num > minNum || foundLowest) {
					return total + num;
				}
				foundLowest = true;
				return total;
			}, 0);
		});

		this.setState({ stats: currentStats });
	}

	render() {
		return (
			<div className="col-md-12">
				<InputBar
					placeHolder="Character Name"
					value={this.state.name}
					manageChange={e => {
						this.setState({ name: e.target.value });
					}}
					title="Name"
				/>

				<div className="input-group col-md-6 row">
					<span className="col-md-3 input-group-text" id="race-label">
						Race
					</span>
					<select
						name="race"
						id="race"
						className="form-control"
						onChange={e => {
							this.setState({
								selectedRace: e.target.value
							});
						}}
					>
						<option value="" />
						{this.state.races.map((race, index) => (
							<option key={race.name} value={index}>
								{race.name}
							</option>
						))}
					</select>
				</div>
				<br />

				<h2 className="row col-md-12">Stats</h2>
				{console.log(this.state.selectedRace)}
				<Button
					manageHandler={this.randomizeStats}
					className="justify-content-end"
					text="Randomize"
				/>

				<StatList
					stats={this.state.stats}
					manageHandler={this.handleStatChange}
					racialBonus={
						this.state.racialBonus[this.state.selectedRace]
					}
					findMod={this.racialMod}
					race={this.state.races[this.state.selectedRace]}
				/>

				<Button
					manageHandler={this.handleSubmit}
					className="justify-content-end"
					text="Submit"
				/>
			</div>
		);
	}
}

export default CharacterCreator;
