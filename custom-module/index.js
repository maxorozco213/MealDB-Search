const superagent = require('superagent');
const config = require('./config.json');
const app = require('../custom-cli-app');

async function searchCategories() {
    const searchURL = `${config.baseURL}/categories.php`;
    
    try {
        const searchResponse = await superagent.get(searchURL);
        app._print(searchResponse.body);

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function searchByCategory(category) {
    let searchURL = `${config.baseURL}/filter.php?c=`;

    try {
        searchURL += `${category}`
        const searchResponse = await superagent.get(searchURL)
        return searchResponse.body;

    } catch(error) {
        console.log(error);
        return error;
    }
}

async function searchFoodById(id) {
    let searchURL = `${config.baseURL}/lookup.php?i=`

    try {
        searchURL += `${id}`
        const searchResponse = await superagent.get(searchURL)
        return searchResponse.body;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// Exporting things in ES6 syntax
module.exports = {
    searchCategories,
    searchByCategory,
    searchFoodById
}