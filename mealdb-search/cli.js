const yargs = require('yargs');
const app = require('./app');

// Defines the commands that are accepted through the terminal
yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: "Search the MealDB API",
        // Puts the command together with some options and secondary commands
        builder: yargs => {
            return yargs
                .command({
                    command: 'meal',
                    desc: "Search the DB for a meal",
                    handler: argv => {
                        app.searchFoods(argv)
                    }

                })
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
            app.searchFoods("search");
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