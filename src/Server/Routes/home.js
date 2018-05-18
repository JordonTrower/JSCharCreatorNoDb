import express from 'express';
import HomeController from '../Controller/homeController';
import CharacterController from '../Controller/CharacterController';

const router = express();

router.get('/items', (req, res) => new HomeController(req, res).getItems());

router.get('/users', (req, res) => new CharacterController(req, res).getCharacters())


module.exports = router;