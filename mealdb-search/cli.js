const yargs = require('yargs');
const app = require('./app');

// Defines the commands that are accepted through the terminal
yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: "Search meal categories {default} or by [area] or main [ingredient]",
        // Puts the command together with some options and secondary commands
        builder: yargs => {
            return yargs
                .usage('$0: Usage search <cmd> [options]')
                .command({
                    command: 'area',
                    desc: "Search all meals in a given area or origin",
                    builder: yargs => {
                        return yargs
                    },
                    handler: argv => {
                        app.searchByArea(argv._.slice(2));
                    }
                })
                .usage('$0: Usage search <cmd> [options]')
                .command({
                    command: 'ingredient',
                    desc: "Search all meals by its main ingredients",
                    handler: argv => {
                        
                        app.searchByIngredient(argv._.slice(2), argv.description);
                    }
                })
                .option('d', {
                    alias: 'description',
                    describe: "Include the description for each category"
                })
        },
        // Calls the function in app.js to perform some tasks
        // Function takes the options as perameters
        handler: argv => {
            app.searchFoodCategories(argv.description);
        }
    })
    .command({
        command: 'category',
        desc: "Search for a meal category by name [-n, -d]",
        builder: yargs => {
            return yargs
                .option('d', {
                    alias: "description",
                    describe: "Include the instructions for the category preparation",
                    boolean: false
                })
        },
        handler: argv => {
            app.searchCategory(argv._.slice(1), argv.description);
        }
    })
    .command({
        command: 'meal',
        desc: "Search for a meal by ID or by name [-i, -n, -d]",
        builder: yargs => {
            return yargs
                .option('i', {
                    alias: "identification",
                    describe: "Search a meal by ID"
                })
                .option('n', {
                    alias: "name",
                    describe: "Search a meal by name"
                })
                .option('d', {
                    alias: "description",
                    describe: "Include the instructions for the meal preparation"
                })
        },
        handler: argv => {
            app.searchMeal(argv.identification, argv.name, argv.description);
        }
    })
    .help('help')
    .argv;