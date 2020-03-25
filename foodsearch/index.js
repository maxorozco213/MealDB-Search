const superagent = require('superagent');
const config = require('./config.json');

async function searchAllCategories() {
    const searchURL = `${config.baseURL}/categories.php`;
    
    try {
        const searchResponse = await superagent.get(searchURL);
        return searchResponse.body;
        
    } catch (error) {
        console.log(error);
    }
}

async function searchByCategory(category) {
    let searchURL = `${config.filterURL}`;

    try {
        searchURL += `c=${category}`;
        const searchResponse = await superagent.get(searchURL);
        return searchResponse.body;

    } catch(error) {
        console.log(error);
    }
}

async function searchFoodDetails(id, name) {
    let searchURL = `${config.lookupURL}`;
    let searchResponse = '';
    
    try {
        if (id || (id && name)) {
            searchURL += `i=${id}`;
            searchResponse = await superagent.get(searchURL);
            
        } else {
            searchURL += `s=${name}`;
            searchResponse = await superagent.get(searchURL);
        }

        return searchResponse.body;

    } catch (error) {
        console.log(error);
    }
}

// Search for meals by country of origin
async function searchMealsByArea(areaName) {
    let searchURL = `${config.filterURL}`;
    let searchResponse = '';

    try {
        searchURL += `a=${areaName}`;
        searchResponse = await superagent.get(searchURL);
        return searchResponse.body;

    } catch (error) {
        console.log(error);
    }
}

// Search for meals by main ingredient
async function searchMealsByIngredient(ingredient) {
    let searchURL = `${config.filterURL}`;
    let searchResponse = '';

    try {
        searchURL += `i=${ingredient}`;
        searchResponse = await superagent.get(searchURL);
        return searchResponse.body;

    } catch (error) {
        console.log(error);
    }
}

// Exporting things in ES6 syntax
module.exports = {
    searchAllCategories,
    searchByCategory,
    searchFoodDetails,
    searchMealsByIngredient,
    searchMealsByArea
}