import createError from 'http-errors';
import express, {
	json,
	urlencoded
} from 'express';
import {
	join
} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import axios from 'axios';
import HomeRouter from './Routes/home';
import CharacterRouter from './Routes/character';

require('dotenv').config();

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(
	urlencoded({
		extended: false
	})
);
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.set('characters', []);
app.set('charId', 0);

axios
	.get('https://rawgit.com/BTMorton/dnd-5e-srd/master/json/01%20races.json')
	.then(res => {
		delete res.data.Races['Racial Traits'];
		const baseClasses = Object.entries(res.data.Races).map(race => {
			const BaseAndSub = Object.entries(race[1][`${race[0]} Traits`]).map(
				content => {
					if (content[0] === 'content') {
						return content[1];
					}
					return null;
				}
			);

			return {
				name: race[0],
				info: BaseAndSub.filter(te => te)[0]
			}; // get rid of the null values for sub
		});

		const modClasses = baseClasses.map(charClass => {
			const inf = charClass.info
				.map(info => {
					if (typeof info === 'string') {
						return info.replace(
							/^(?!.*(Ability Score Increase)).*$/g,
							''
						);
					}
					return null;
				})
				.filter(info => info !== '' && info)[0];
			const split = inf.split(' ');
			return split
				.map(word =>
					word.replace(
						/^(?!.*(Strength|Dexterity|Constitution|Wisdom|Intelligence|Charisma|[0-9])).*$/gi,
						''
					)
				)
				.filter(info => info !== '')
				.join(' ')
				.split(',');
		});

		app.set('races', [baseClasses, modClasses]);
	});

axios.get('http://dnd5eapi.co/api/classes/').then(res => {
	const classes = [];

	res.data.results.forEach(charClass => {
		axios.get(charClass.url).then(classData => {
			const profChoices = [];

			classData.data.proficiency_choices[0].from.forEach(prof => {
				profChoices.push(prof.name);
			});

			const itemProf = [];

			classData.data.proficiencies.forEach(prof => {
				itemProf.push(prof.name);
			});

			classes.push({
				index: classData.data.index,
				name: classData.data.name,
				hitDie: classData.data.hit_die,
				skillProf: profChoices,
				itemProf
			})

			app.set('classes', classes)
		});
	});
});


axios.get('https://rawgit.com/adrpadua/5e-database/master/5e-SRD-Equipment.json').then(res => {
	const items = {
		weapon: [],
		armor: []
	};

	res.data.forEach(item => {


		const itemInfo = {};

		itemInfo.id = item.index
		itemInfo.name = item.name;
		itemInfo.cost = item.cost;
		itemInfo.weight = item.weight;

		if (item.equipment_category === 'Weapon') {
			itemInfo.subType = item.subtype;
			itemInfo.weaponRange = item.weapon_range;
			itemInfo.damage = {
				diceCount: item.damage.dice_count,
				diceValue: item.damage.dice_value
			}
			itemInfo.properties = item.properties.map((prop) => prop.name);

			items.weapon.push(itemInfo)
		} else if (item.equipment_category === 'Armor') {
			itemInfo.subType = item.subtype;
			itemInfo.strengthReq = item.str_minimum;
			itemInfo.armorClass = {
				base: item.armor_class.base,
				dexBonus: item.armor_class.dex_bonus,
				maxBonus: item.armor_class.max_bonus
			}
			itemInfo.stealthDisadvantage = item.stealth_disadvantage;

			items.armor.push(itemInfo)

		}
		app.set('items', items)

	})

});

app.use('/', HomeRouter);
app.use('/character', CharacterRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;