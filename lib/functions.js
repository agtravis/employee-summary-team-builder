'use strict';

const app = require('../app');
const inquirer = require('inquirer');
const fs = require('fs');

const writeFile = fs.writeFile;
const util = require('util');

const writeFileAsync = util.promisify(writeFile);

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

async function displayTeamPage(team, teamAsString) {
  const HTML = generateHTML(team);
  if (!fs.existsSync(`${team[0].name}s-team`)) {
    fs.mkdir(`${team[0].name}s-team`, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  await writeFileAsync(`${team[0].name}s-team/team.html`, HTML, 'utf8');
  const JS = generateJavaScript(teamAsString);
  await writeFileAsync(`${team[0].name}s-team/scripts.js`, JS, 'utf8');
}

function generateHTML(team) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${team[0].name}'s Dev Team</title>
    </head>
    <body>
      <div id="team-div"></div>
      <script src="./scripts.js"></script>
    </body>
  </html>
  
  `;
}

function generateJavaScript(teamAsString) {
  return `'use strict';

  const teamDiv = document.getElementById('team-div');
  
  const teamAsObject = [{}];
  
  const team = [];
  
  for (const individual of [${teamAsString}]) {
    const person = individual;
    team.push(person);
  }
  console.log(team);
  
  for (let i = 0; i < team.length; ++i) {
    const newDiv = document.createElement('div');
    const newHeading = document.createElement('h5');
    newHeading.textContent = team[i].title; // change to method
    newDiv.appendChild(newHeading);
    for (const property in team[i]) {
      let key = property;
      let value = team[i][property];
      const newP = document.createElement('p');
      switch (key) {
        case 'name':
          key = 'Employee Name';
          break;
        case 'id':
          key = 'Employee ID#';
          break;
        case 'title':
          key = 'Position';
          break;
        case 'email':
          key = 'Contact';
          break;
        case 'officeNumber':
          key = 'Office Number';
          break;
        case 'gitHub':
          key = 'GitHub Profile';
          value = '<a href="https://github.com/' + value + '" target="_blank">' + value + '</a>';
          break;
        case 'school':
          key = 'School';
          break;
        // case 'role' :
        //   key = 'Role';
        //   break;
        default:
          key = 'undefined';
      }  
      newP.innerHTML = '<span class="key">' + key + ':</span> ' + value;
      newDiv.appendChild(newP);
    }
    teamDiv.appendChild(newDiv);
  }
  `;
}

module.exports = {
  displayTeamPage,
  shouldContinue,
  addManager,
  addEngineer,
  addIntern
};
