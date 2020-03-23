// Pre-made modules
const inquirer = require('inquirer');
const clc = require('cli-color');
// Custom module
const foodSearch = require('foodsearch')

const _printCategories = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        result.categories.forEach(element => {
            console.log(clc.cyan(`ID: ${element.idCategory}`));
            console.log(clc.magenta(`Name: ${element.strCategory}\n`))
            console.log(clc.green(`Description: `) + `\n${element.strCategoryDescription}\n`)
        });

    } else {
        result.categories.forEach(element => {
            console.log(`ID: ${element.idCategory}`);
            console.log(`Name: ${element.strCategory}\n`);
        });
    }
};

const _printMealsInCategory = (result, isDescriptionIncluded) => {
    if (!isDescriptionIncluded) {
        result.meals.forEach(meal => {
            console.log(`ID: ${meal.idMeal}`);
            console.log(`Name: ${meal.strMeal}\n`);
        })

    } else {
        result.meals.forEach(async function(meal) {
            console.log(`ID: ${meal.idMeal}`);
            console.log(`Name: ${meal.strMeal}\n`);
            console.log(await termImg.buffer(meal.strMealThumb));
        })
    }
}

const _printMeals = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        result.meals.forEach(meal => {
            console.log(`ID: ${meal.idMeal}`)
            console.log(`Name: ${meal.strMeal}`)
            console.log(`Origin: ${meal.strArea}`)
            console.log(`Youtube Tutorial: ${meal.strYoutube}\n`)
            console.log(`Cooking instructions: \n${meal.strInstructions}`)
        })
        
    } else {
        result.meals.forEach(meal => {
            console.log(`ID: ${meal.idMeal}`)
            console.log(`Name: ${meal.strMeal}`)
            console.log(`Youtube Tutorial: ${meal.strYoutube}`)
        })

    }
}

// Prompt the user to search a category
async function _searchCategoryPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'searchCategory',
            message: "Which category do you want to search? (Enter 'n' to cancel)"
        }
    ])
        .then(answer => {
            if (answer.searchCategory === "n") {
                return 0;
            } else {
                searchCategory(answer.searchCategory);
            }
        })
        .catch(error => console.log(error))
}

// Prompt the user to search for a specific meal
async function _searchMealDetailsPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'searchMeal',
            message: "Which meal do you want to search? (Enter 'n' to cancel)"
        }
    ])
        .then(answer => {
            if (answer.searchMeal === "n") {
                return 0;
            } else {
                searchMeal(answer.searchMeal);
            }
        })
        .catch(error => console.log(error))
}

// Default action - Gets all the food categories and their ID numbers
async function searchFoodCategories(isDescriptionIncluded = false) {
    const searchRequest = await foodSearch.searchAllCategories();

    _printCategories(searchRequest, isDescriptionIncluded);

    // _searchCategoryPrompt();
}

// Search the meals that are available in a category chosen by the user
async function searchCategory(categoryName = null, isDescriptionIncluded = false) {
    try {
        if (!categoryName) {
            _searchCategoryPrompt();
        } else {
            const searchRequest = await foodSearch.searchByCategory(categoryName);
            _printMealsInCategory(searchRequest, isDescriptionIncluded);
            _searchMealDetailsPrompt();
        }

    } catch (error) {
        console.log("searchCategory:: ", error)
    }
}

// Search a specific meal that is specified by the user
async function searchMeal(mealId = null, mealName = null, isDescriptionIncluded = false) {
    let searchRequest = '';

    try {
        if (mealId || mealId && mealName) {
            searchRequest = await foodSearch.searchFoodDetails(mealId);
            _printMeals(searchRequest, isDescriptionIncluded);

        } else if (!mealId || mealName) {
            searchRequest = await foodSearch.searchFoodDetails(mealName);
            _printMeals(searchRequest, isDescriptionIncluded);

        } else {
            console.log("Meal ID or meal name required");
        }

    } catch (error) {
        console.log("searchMeal:: ", error)
    }
}

module.exports = {
    searchFoodCategories,
    searchMeal,
    searchCategory
}