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

// TODO Get food by ID
async function searchFoodDetails(id, name) {
    let searchURL = `${config.lookupURL}`;
    let nameURL = `${config.searchURL}`;
    let searchResponse = '';
    
    try {
        if (id || (id && name)) {
            searchURL += `i=${id}`;
            searchResponse = await superagent.get(searchURL);
            
        } else {
            console.log("namURL", nameURL);
            nameURL += `s=${name}`;
            searchResponse = await superagent.get(nameURL);
        }

        return searchResponse.body;

    } catch (error) {
        console.log(error);
    }
}

// Search a meal by name
async function searchFoodByName(name) {
    let searchURL = `${config.searchURL}`;

    try{
        searchURL += `s=${name}`;
        searchResponse = await superagent.get(searchURL);

    } catch(error) {
        console.log("There was an error searchng by name");
        console.log("Error message: ", error);
    }

    return searchResponse.body;
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
    searchMealsByArea,
    searchFoodByName
}