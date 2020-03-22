const yargs = require('yargs');
const app = require('../custom-module/index.js');

// Defines the commands that are accepted through the terminal
yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: "Search the MealDB API",
        // Puts the command together with some options
        builder: yargs => {
            return yargs
                .option('i', {
                    alias: 'identification',
                    describe: "Search for all meal categories"
                })
                .option('c', {
                    alias: 'category',
                    describe: "Search a meal category"
                })
        },
        // Calls the function in app.js to perform some tasks
        // Function takes the options as perameters
        handler: argv => {
            app.searchCategories(argv.identification);
        }
    })
    .command({
        command: 'meal',
        desc: "Search for a meal by ID",
        handler: argv => {
            app.searchByCategory(argv);
        }
    })
    .help('help')
    .argv;