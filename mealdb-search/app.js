const inquirer = require('inquirer');
const foodSearch = require('foodsearch')

const _print = result => {
    console.log(`ID                   Name`)
    console.log("-----------------------------------------")

    result.categories.forEach(element => {
        console.log(`${element.idCategory}                    ${element.strCategory}`);
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

async function searchFoods() {
    const searchRequest = await foodSearch.searchCategories();

    _print(searchRequest);
}

module.exports = {
    searchFoods
}