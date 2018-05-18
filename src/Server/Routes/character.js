import express from 'express';
import CharacterController from '../Controller/CharacterController';

const router = express();

router.get('/recieve', (req, res) => new CharacterController(req, res).getCharacters())

router.post('/create', (req, res) => new CharacterController(req, res).createCharacter())

router.post('/get-races', (req, res) => new CharacterController(req, res).getRaces())

module.exports = router;