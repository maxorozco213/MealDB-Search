const app = require('./app.js');
const yargs = require('yargs');

// Defines the commands that are accepted through the terminal
yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: "Search the Ticketmaster API",
        // Puts the command together with some options
        builder: yargs => {
            return yargs
                .option('k', {
                    alias: 'keyword',
                    describe: "Search with a keyword"
                })
                .option('l', {
                    alias: 'location',
                    describe: "Search by city name"
                })
        },
        // Calls the function in app.js to perform some tasks
        // Function takes the options as perameters
        handler: argv => {
            app.searchEvent(argv.keyword, argv.location);
        }
    })
    .help('help')
    .argv;