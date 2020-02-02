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
      message: `What is your engineer's GitHub?`,
      name: `gitHub`
    }
  ]);
  return engineer;
}

async function addIntern() {
  const intern = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your intern's name?`,
      name: 'internName'
    },
    {
      type: 'input',
      message: `What is your intern's ID?`,
      name: `internId`
    },
    {
      type: `input`,
      message: `What is your intern's email?`,
      name: `internEmail`
    },
    {
      type: `input`,
      message: `What is your intern's school?`,
      name: `school`
    }
  ]);
  return intern;
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

function displayTeamPage(team) {
  console.log(team[0].getRole());
}

module.exports = {
  displayTeamPage,
  shouldContinue,
  addManager,
  addEngineer,
  addIntern
};
