const superagent = require('superagent');
const config = require('./config.json');

async function searchAllCategories() {
    const searchURL = `${config.baseURL}/categories.php`;
    
    try {
        const searchResponse = await superagent.get(searchURL);
        return searchResponse.body
        
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

async function searchFoodDetails(id, name) {
    let searchURL = `${config.baseURL}/lookup.php?i=`;
    let searchResponse = ''

    try {
        if(id || (id && name)) {
            searchURL += `${id}`
            searchResponse = await superagent.get(searchURL)
            
        } else {
            searchURL += `${name}`
            searchResponse = await superagent.get(searchURL)
        }

        return searchResponse.body;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Exporting things in ES6 syntax
module.exports = {
    searchAllCategories,
    searchByCategory,
    searchFoodDetails
}