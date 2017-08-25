var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/articles', (req, res, next) => {
	Article.findAll()
	.then((articles) => {
		res.json(articles);
	})
	.catch(next);
});

router.get('/articles/:id', (req, res, next) => {	Article.findById(req.params.id)
	.then((article) => {
		article === null ? res.sendStatus(404) : res.json(article);
	})
	.catch(next);

});

router.post('/articles', (req, res, next) => {
	Article.create(req.body)
	.then((article) => {
		res.status(200).send({message: 'Created successfully',
			article
		 })
	}) 
	.catch(next);
});

router.put('/articles/:id', (req, res, next) => {
		if(req.body.title === '')
			return res.sendStatus(500)
		Article.update(req.body, {where: {id: req.params.id}})
		.then(() => {
			return Article.findById(req.params.id)
		})
		.then((article) => {
			res.status(200).send({message: 'Updated successfully', article})
		})
		.catch(next);
	});
	



module.exports = router;
