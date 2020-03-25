// Pre-made modules
const inquirer = require('inquirer');
const clc = require('cli-color');
const column = require('columnify');
// Custom module
const foodSearch = require('foodsearch')

const _printCategories = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        process.stdout.write(clc.columns([
            [clc.bold("First Name"), clc.bold("Last Name")]
        ]));
        result.categories.forEach(element => {
            console.log(clc.cyan(`ID: ${element.idCategory}`));
            console.log(clc.cyan(`Name: ${element.strCategory}`))
            console.log(clc.green(`Description: `) + `\n${element.strCategoryDescription}\n`)
        });

    } else {
        let data = {};

        result.categories.forEach(element => {
            data[clc.cyan(element.idCategory)] = clc.green(element.strCategory)
        })

        console.log(column(data, {columns: ["ID", "Name"]}));
    }
};

const _printMealsInCategory = (result) => {
    let data = {};

    result.meals.forEach(element => {
        data[clc.cyan(element.idMeal)] = clc.green(element.strMeal)
    })

    console.log(column(data, {columns: ["ID", "Name"]}));

}

const _printMeals = (result, isDescriptionIncluded) => {
    if (isDescriptionIncluded) {
        result.meals.forEach(meal => {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.cyan(`Name: ${meal.strMeal}`));
            console.log(clc.cyan(`Origin: ${meal.strArea}`));
            if (meal.strYoutube) {
                console.log(clc.green(`Youtube Tutorial: ${meal.strYoutube}\n`));
            } else {
                console.log(clc.green(`Youtube Tutorial: None\n`));
            }
            console.log(clc.magentaBright(`Cooking instructions:`) + `\n${meal.strInstructions}`);
        })
        
    } else {
        result.meals.forEach(meal => {
            console.log(clc.cyan(`ID: ${meal.idMeal}`));
            console.log(clc.cyan(`Name: ${meal.strMeal}`));
            console.log(clc.cyan(`Origin: ${meal.strArea}`));
        })
    }
}

const _printMealsByType = (result, type) => {
    let data = {};
    result.meals.forEach(element => {
        data[clc.cyan(element.idMeal)] = clc.green(element.strMeal)
    })

    console.log(clc.bold(`All ${type} food`))
    console.log(column(data, {columns: ["ID", "Name"]}));
}

// Prompt the user to search a category
async function _searchCategoryPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'searchCategory',
            message: "Which category (Name) do you want to search? (Enter 'n' to cancel)"
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
    console.log(clc.bold(categoryName));
    try {
        if (!categoryName || categoryName.length === 0) {
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

async function searchByArea(area = null) {
    try {
        if (area !== null) {
            const searchRequest = await foodSearch.searchMealsByArea(area);
            _printMealsByType(searchRequest, area);

        } else {
            console.log("Country of origin is required.");
        }

    } catch(error) {
        console.log(error);
    }
}

async function searchByIngredient(ingredient = null) {
    try {
        if (ingredient !== null) {
            const searchRequest = await foodSearch.searchMealsByIngredient(ingredient);
            _printMealsByType(searchRequest, ingredient);
        } else {
            console.log("Please enter the main ingredient.");
        }

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