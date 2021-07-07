var express = require('express');
var router = express.Router();
const Card = require("../schemas/card");

// const cards = [
// 	{ name: 'Weedle', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_1-2x.jpg', series: 'battle style' },
// 	{ name: 'Kakuna', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_2-2x.jpg', series: 'battle style' },
// 	{ name: 'Beedrill', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_3-2x.jpg', series: 'battle style' },
// 	{ name: 'Heracross', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_4-2x.jpg', series: 'battle style' },
// 	{ name: 'Snover', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_5-2x.jpg', series: 'battle style' },
// 	{ name: 'Celebi', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_7-2x.jpg', series: 'pokemon v' },
// 	{ name: 'Blaziken', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_20-2x.jpg', series: 'pokemon v' },
// 	{ name: 'Volcanian', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_25-2x.jpg', series: 'pokemon v' },
// 	{ name: 'Calyrex', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_45-2x.jpg', series: 'pokemon v' },
// 	{ name: 'Zeraora', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_53-2x.jpg', series: 'pokemon v' }
// ];

// cards.forEach(async(card) => {
// 	const newCard = new Card({
// 	name: card.name,
// 	url: card.url,
// 	series: card.series
// 	});

// 	await newCard.save();
// });


/* GET card listing */
router.get('/', async function(req, res, next) {
	Card.find((err, doc) => {
		if (err) {
			return res.status(500).json({msg: err.message});
		}
		if (!doc) {
			return res.status(404).json({msg: "Cannot find any data"});
		}
		res.send(doc);
	});
});

/* GET card with a series type
   req.params: series
*/
router.get('/:series', async function(req, res, next) {
	const series = req.params.series;
	Card.find({"series": series}, (err, doc) => {
		if (err) {
			return res.status(500).json({msg: err.message});
		}
		if (!doc) {
			return res.status(404).json({msg: "Cannot find any data"});
		}
		res.send(doc);
	});
});

/* POST a new card
   req.body: name, url
*/
router.post('/', async function(req, res, next) {
	const {name, url} = req.body;
	const series = req.body.series || "";
	const newCard = new Card({
		name: name,
		url: url,
		series: series
	});
	console.log(newCard);
	newCard.save((err, doc) => {
		if (err) {
			return res.status(500).json({msg: err.message});
		}
		res.send(doc);
	})
});

/* DELETE a card with given id
   req.params: id
*/
router.delete('/:id', function(req, res, next) {
	const id = req.params.id;

	Card.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            return res.status(500).json({msg: err.message});
        }       
        res.send(doc);
	});
});

/* PUT a card's series type with given id
   req.params: id
*/
router.put('/:id', function(req, res, next) {
	const id = req.params.id;
	const series = req.body.series

	Card.findByIdAndUpdate(id, {$set: {series: series}}, {new: true}, (err, doc) => {
        if (err) {
            return res.status(500).json({msg: err.message});
        }       
        res.send(doc);
	});
});

module.exports = router;
