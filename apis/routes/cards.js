var express = require('express');
var router = express.Router();

const cards = [
	{ name: 'Weedle', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_1-2x.jpg', series: 'battle style' },
	{ name: 'Kakuna', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_2-2x.jpg', series: 'battle style' },
	{ name: 'Beedrill', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_3-2x.jpg', series: 'battle style' },
	{ name: 'Heracross', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_4-2x.jpg', series: 'battle style' },
	{ name: 'Snover', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_5-2x.jpg', series: 'battle style' },
	{ name: 'Celebi', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_7-2x.jpg', series: 'pokemon v' },
	{ name: 'Blaziken', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_20-2x.jpg', series: 'pokemon v' },
	{ name: 'Volcanian', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_25-2x.jpg', series: 'pokemon v' },
	{ name: 'Calyrex', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_45-2x.jpg', series: 'pokemon v' },
	{ name: 'Zeraora', url: 'https://tcg.pokemon.com/assets/img/expansions/chilling-reign/cards/en-us/SWSH06_EN_53-2x.jpg', series: 'pokemon v' }
];

/* GET card listing */
router.get('/', function(req, res, next) {
	res.send(cards);
});

/* GET card with a series type
   req.params: series
*/
router.get('/:series', function(req, res, next) {
	const series = req.params.series;
	const cardsBySeries = cards.filter((card) => card.series === series);
	res.send(cardsBySeries);
});

/* POST a new card
   req.body: name, url
*/
router.post('/', function(req, res, next) {
	const newCard = req.body;
	cards.push(newCard);
	res.send(cards);
});

/* DELETE a card with given index
   req.params: idx
*/
router.delete('/:idx', function(req, res, next) {
	const index = req.params.idx;
	if (index > -1) {
		cards.splice(index, 1);
	}
	res.send(cards);
});

module.exports = router;
