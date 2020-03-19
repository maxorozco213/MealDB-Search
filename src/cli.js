require('yargs')
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: "search",
        desc: "Search the Ticketmaster API",
        builder: yargs => {
            return yargs
                .option('a', {
                    alias: 'all',
                    describe: "Search all",
                })
        },
        handler: argv => {
            app.draw(argv)
        }
    })
    .help('help').argv;