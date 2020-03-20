const superagent = require('superagent');
const inquirer = require('inquirer');
const {apiKey} = require('./apiKey');

const _print = result => {
    result._embedded.events.forEach(element => {
        console.log(`${element.name} - ${element.locale}`);
    });
    
};

const _anotherSearchPrompt = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'search',
            message: 'Would you like to do another search?'
        }
    ]);
};

async function searchEvent(keyword = null) {
    const baseURL = "https://app.ticketmaster.com/discovery/v2";
    const source = "Ticketmaster";
    let searchURL = `${baseURL}/events?apikey=${apiKey}`;

    if (keyword) {
        searchURL += `keyword=${keyword}`;
    }

    const searchResponse = await superagent.get(searchURL);
    _print(searchResponse.body);
}

// Exporting things in ES6 syntax
module.exports = {
    searchEvent
}