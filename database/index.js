"use strict"
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  avatarUrl: String,
  userUrl: String,
  username: String,
  id: Number,
  name: String,
  url: String,
  description: String,
  language: String,
  created_at: String
});

let Repo = mongoose.model('Repo', repoSchema);

let remove = (username) => {
	Repo.remove({username: username}, (err, removed) => {
		console.log(`${removed} documents removed!!!`)
	});
}
let save = (repoObject) => {
	var instance = new Repo(repoObject);
	instance.save();
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let find = () => {

	return new Promise((resolve, reject) => {
		Repo.find({}, (err, docs) => {
			if(err){
				reject(err);
			}

			console.log(docs);
			resolve(docs);
		});	
	});

}

module.exports.save = save;
module.exports.find = find;
module.exports.remove = remove;