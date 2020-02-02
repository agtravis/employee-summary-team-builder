'use strict';

const app = require('../app');
const inquirer = require('inquirer');

async function addManager() {
  const manager = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your manager's name?`,
      name: 'managerName'
    },
    {
      type: 'input',
      message: `What is your manager's ID?`,
      name: `managerId`
    },
    {
      type: `input`,
      message: `What is your manager's email?`,
      name: `managerEmail`
    },
    {
      type: `input`,
      message: `What is your manager's office number?`,
      name: `officeNumber`
    }
  ]);
  return manager;
}

async function addEngineer() {
  const engineer = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your engineer's name?`,
      name: 'engineerName'
    },
    {
      type: 'input',
      message: `What is your engineer's ID?`,
      name: `engineerId`
    },
    {
      type: `input`,
      message: `What is your engineer's email?`,
      name: `engineerEmail`
    },
    {
      type: `input`,
      message: `What is your engineer's office GitHub?`,
      name: `gitHub`
    }
  ]);
  return engineer;
}

async function shouldContinue() {
  let shouldContinue;
  const answer = await inquirer.prompt({
    type: 'list',
    message: 'Which type of team member would you like to add next?',
    choices: [
      'Engineer',
      'Intern',
      `I don't want to add any more team members`
    ],
    name: 'shouldContinue'
  });
  switch (answer.shouldContinue) {
    case `Engineer`:
      return `engineer`;
    case `Intern`:
      return `intern`;
    default:
      return false;
  }
}

module.exports = {
  shouldContinue,
  addManager,
  addEngineer
};
