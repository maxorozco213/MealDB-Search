// Defines the commands that are accepted through the terminal
require('yargs')
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: "search",
        desc: "Search the Ticketmaster API",
        // Puts the command together with some options
        builder: yargs => {
            return yargs
                .option('a', {
                    alias: 'all',
                    describe: "Search all",
                })
        },
        // Calls the function in app.js to perform some tasks
        // Function takes the options as perameters
        handler: argv => {
            app.draw(argv)
        }
    })
    .help('help').argv;