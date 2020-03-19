import superagent from 'superagent';
import inquirer from 'inquirer';


const _print = result => {

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