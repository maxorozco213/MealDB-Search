// Pre-made modules
const inquirer = require('inquirer');
const clc = require('cli-color');
// Custom module
const foodSearch = require('foodsearch')

const _printCategories = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        result.categories.forEach(element => {
            console.log(clc.cyan(`ID: ${element.idCategory}`));
            console.log(clc.cyan(`Name: ${element.strCategory}\n`))
            console.log(clc.green(`Description: `) + `\n${element.strCategoryDescription}\n`)
        });

    } else {
        result.categories.forEach(element => {
            console.log(clc.cyan(`ID: ${element.idCategory}`));
            console.log(clc.green(`Name: ${element.strCategory}`));
        });
    }
};

const _printMealsInCategory = (result, isDescriptionIncluded) => {
    if (!isDescriptionIncluded) {
        result.meals.forEach(meal => {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.green(`Name: ${meal.strMeal}`));
        })

    } else {
        result.meals.forEach(async function(meal) {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.green(`Name: ${meal.strMeal}`));
            console.log(await termImg.buffer(meal.strMealThumb));
        })
    }
}

const _printMeals = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        result.meals.forEach(meal => {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.cyan(`Name: ${meal.strMeal}`));
            console.log(clc.cyan(`Origin: ${meal.strArea}`));
            console.log(clc.green(`Youtube Tutorial: ${meal.strYoutube}\n`));
            console.log(clc.green(`Cooking instructions: \n${meal.strInstructions}`));
        })
        
    } else {
        result.meals.forEach(meal => {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.cyan(`Name: ${meal.strMeal}`));
            console.log(clc.green(`Youtube Tutorial: ${meal.strYoutube}`));
        })

    }
}

const _printMealsByType = result => {
    console.log(result.meals);
    // result.forEach(meal => {
    //     console.log(meal);
    // })
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
            message: "Which meal (ID) do you want to search? (Enter 'n' to cancel)"
        }
    ])
        .then(answer => {
            if (answer.searchMeal === "n") {
                return 0;
            } else {
                searchMeal(answer.searchMeal, null, true);
            }
        })
        .catch(error => console.log(error))
}

// Default action - Gets all the food categories and their ID numbers
async function searchFoodCategories(isDescriptionIncluded = false) {
    const searchRequest = await foodSearch.searchAllCategories();

    _printCategories(searchRequest, isDescriptionIncluded);

    _searchCategoryPrompt();
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
    try {
        if (mealId || mealId && mealName) {
            const searchRequest = await foodSearch.searchFoodDetails(mealId);
            _printMeals(searchRequest, isDescriptionIncluded);

        } else if (!mealId || mealName) {
            const searchRequest = await foodSearch.searchFoodDetails(mealName);
            _printMeals(searchRequest, isDescriptionIncluded);

        } else {
            console.log("Meal ID or meal name required");
        }

    } catch (error) {
        console.log("searchMeal:: ", error)
    }
}

async function searchByArea(area = 'Canadian') {
    try {
        const searchRequest = await foodSearch.searchMealsByArea(area);
        _printMealsByType(searchRequest);

    } catch(error) {
        console.log(error);
    }
}

async function searchByIngredient(ingredient = null) {
    try {
        const searchRequest = await foodSearch.searchMealsByIngredient(ingredient);
        _printMealsByType(searchRequest);

    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    searchFoodCategories,
    searchMeal,
    searchCategory,
    searchByIngredient,
    searchByArea
}