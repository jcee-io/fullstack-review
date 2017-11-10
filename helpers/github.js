"use strict"

const request = require('request');
const config = require('../config.js');
const $ = require('jquery');
const Promise = require('bluebird');
const db = require('../database/index');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };


  request(options, (error, response, body) => {
    if (error) {
      throw Error('SOMETHING WENT WRONG');
    }
    //parsing it from string to object and setting it to 25 repos should it exceed 25
    body = JSON.parse(body);

    db.remove(username);
    console.log(body);

    if(Array.isArray(body)){
      body.forEach(repo => {
        repo.description = repo.description || 'No description'

        var dbItem = {
          avatarUrl: repo.owner.avatar_url,
          userUrl: repo.owner.url,
          username: username,
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          created_at: repo.created_at
        }
        
        db.save(dbItem);
      });    
    }

  });

}

module.exports = getReposByUsername;