'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user', {
	name: Sequelize.STRING
});

var Article = db.define('article', {
	title: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		} 
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	version: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	} 

},{
	getterMethods: {
		snippet() {
			return this.content === undefined ? '' : this.content.slice(0,23) + '...';
		}
	},
	hooks: {
		beforeSave: (content) => {
			content.version = content.getDataValue('version') + 1 ;
		}
	} 
}
);

Article.belongsTo(User, {as: 'author'});


Article.prototype.truncate = function(len){
	this.content = 	this.getDataValue('content').slice(0, len);
};

Article.findByTitle = function(title){
	return Article.findOne({where: {title: title}});
}

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
