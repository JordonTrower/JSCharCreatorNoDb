import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import StatList from './StatList';
import Button from '../Common/Button';
import InputBar from '../Common/InputBar';
import SelectBar from '../Common/SelectBar';

const defaultStats = {
	Strength: 10,
	Constitution: 10,
	Dexterity: 10,
	Wisdom: 10,
	Intelligence: 10,
	Charisma: 10
};

function racialMod(stat, race, bonus) {
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

	return Number(string);
}

class CharacterView extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			races: [],
			racialBonus: [],
			selectedRace: '',
			classes: [],
			selectedClass: '',
			level: '',
			stats: defaultStats,
			editing: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStatChange = this.handleStatChange.bind(this);
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: '/character/get-races',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(res => {
			this.setState({ races: res.data[0], racialBonus: res.data[1] });
		});

		axios({
			method: 'get',
			url: '/character/get-classes',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(res => {
			this.setState({ classes: res.data });
		});

		axios({
			method: 'get',
			url: `/character/get-character/?id=${this.props.match.params.id}`,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(res => {
			console.log(res.data);
			this.setState({
				name: res.data.character.name,
				selectedClass: res.data.character.class_id,
				selectedRace: res.data.character.race_id,
				stats: res.data.character.stats
			});
		});
	}

	handleSubmit(event) {
		const currentStats = Object.assign({}, this.state.stats);
		const racialBonus = this.state.racialBonus[this.state.selectedRace];
		const race = this.state.races[this.state.selectedRace];

		if (race && racialBonus && currentStats) {
			Object.entries(currentStats).forEach(stat => {
				const statName = stat[0][0].toUpperCase() + stat[0].substr(1);
				currentStats[statName] = Number(currentStats[statName]);
				currentStats[statName] += Number(
					racialMod(stat, race, racialBonus)
				);
			});

			const data = {
				name: this.state.name,
				race_id: this.state.selectedRace,
				class_id: this.state.selectedClass,
				stats: currentStats
			};

			axios({
				method: 'put',
				url: `/character/update?id=${this.props.match.params.id}`,
				data
			}).then(response => {
				console.log(response);
				this.setState({
					editing: !this.state.submit
				});
			});
		} else {
			$('.alert-danger').show();
		}
		event.preventDefault();
	}

	handleStatChange(event) {
		const currentStats = this.state.stats;
		currentStats[event.target.id] = event.target.value;
		console.log(event.target);
		this.setState({ stats: currentStats });
	}

	render() {
		return (
			<div className="col-md-12">
				<div className="col-md-6">
					<div
						className="alert alert-danger"
						role="alert"
						style={{ display: 'none' }}
					>
						Make Sure To Fill Out Everything!
					</div>
					<div
						className="row col-md-12 justify-content-end btn-group"
						role="group"
					>
						<Button
							manageHandler={() => {
								this.setState({ editing: !this.state.editing });
							}}
							className="justify-content-end btn"
							text="Edit"
						/>
						<Button
							manageHandler={() => {
								axios
									.delete(
										`/character/delete/?id=${
											this.props.match.params.id
										}`
									)
									.then(res => {
										console.log(res);
										this.props.history.push('/character/');
									});
							}}
							className="justify-content-end btn"
							buttonColor="btn-danger"
							text="Delete"
						/>
					</div>
					<InputBar
						placeHolder="Character Name"
						value={this.state.name}
						manageChange={e => {
							this.setState({ name: e.target.value });
						}}
						title="Name"
						editing={this.state.editing}
					/>

					<SelectBar
						title="Race"
						data={this.state.races}
						name="race"
						manageChange={e => {
							this.setState({
								selectedRace: e.target.value
							});
						}}
						editing={this.state.editing}
						value={this.state.selectedRace}
					/>

					<SelectBar
						title="Class"
						data={this.state.classes}
						name="class"
						manageChange={e => {
							this.setState({
								selectedClass: e.target.value
							});
						}}
						editing={this.state.editing}
						value={this.state.selectedClass}
					/>

					<SelectBar
						title="Level"
						data={[
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10,
							11,
							12,
							13,
							14,
							15,
							16,
							17,
							18,
							19,
							20
						]}
						name="level"
						manageChange={e => {
							this.setState({
								levels: Number(e.target.value)
							});
						}}
						editing={this.state.editing}
						value={this.state.level}
					/>
					<br />

					<h2 className="row col-md-12">Stats</h2>

					<StatList
						stats={this.state.stats}
						manageHandler={this.handleStatChange}
						racialBonus={
							this.state.racialBonus[this.state.selectedRace]
						}
						findMod={racialMod}
						race={this.state.races[this.state.selectedRace]}
						editing={this.state.editing}
					/>
				</div>
				<br />

				<Button
					manageHandler={this.handleSubmit}
					className="justify-content-end"
					text="Submit"
					editing={this.state.editing}
				/>
			</div>
		);
	}
}

export default withRouter(CharacterView);