import express from 'express';
import CharacterController from '../Controller/CharacterController';

const router = express();

router.get('/recieve', (req, res) => new CharacterController(req, res).getCharacters())

router.post('/create', (req, res) => new CharacterController(req, res).createCharacter())

router.get('/get-races', (req, res) => new CharacterController(req, res).getRaces())

router.get('/get-classes', (req, res) => new CharacterController(req, res).getClasses())

router.get('/get-items', (req, res) => new CharacterController(req, res).getItems())

router.get('/get-weapons', (req, res) => new CharacterController(req, res).getWeapons())

router.get('/get-armor', (req, res) => new CharacterController(req, res).getArmor())

router.get('/get-character/:id', (req, res) => new CharacterController(req, res).getCharacter())

router.put('/update', (req, res) => new CharacterController(req, res).updateCharacter())

router.delete('/delete', (req, res) => new CharacterController(req, res).deleteCharacter())




module.exports = router;