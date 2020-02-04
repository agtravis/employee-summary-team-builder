'use strict';

const app = require('../app');
const inquirer = require('inquirer');
const fs = require('fs');
const open = require('open');

const writeFile = fs.writeFile;
const util = require('util');

const writeFileAsync = util.promisify(writeFile);

async function addManager() {
  const manager = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your manager's name?`,
      name: 'managerName',
      validate: function(value) {
        var pass = value.match(/^([a-z-']+) ([a-z-']+(\.)?)( [a-z-']+)?$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a first and last name, middle name or initial optional';
      }
    },
    {
      type: 'input',
      message: `What is your manager's ID?`,
      name: `managerId`,
      validate: function(value) {
        var pass = value.match(/^[0-9-]+$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a number (hyphens allowed)';
      }
    },
    {
      type: `input`,
      message: `What is your manager's email?`,
      name: `managerEmail`,
      validate: function(value) {
        var pass = value.match(
          /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
        );
        if (pass) {
          return true;
        }
        return 'Please enter a valid email';
      }
    },
    {
      type: `input`,
      message: `What is your manager's office number?`,
      name: `officeNumber`,
      validate: function(value) {
        var pass = value.match(/^[0-9-]+$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a number (hyphens allowed)';
      }
    }
  ]);
  return manager;
}

async function addEngineer() {
  const engineer = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your engineer's name?`,
      name: 'engineerName',
      validate: function(value) {
        var pass = value.match(/^([a-z-']+) ([a-z-']+(\.)?)( [a-z-']+)?$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a first and last name, middle name or initial optional';
      }
    },
    {
      type: 'input',
      message: `What is your engineer's ID?`,
      name: `engineerId`,
      validate: function(value) {
        var pass = value.match(/^[0-9-]+$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a number (hyphens allowed)';
      }
    },
    {
      type: `input`,
      message: `What is your engineer's email?`,
      name: `engineerEmail`,
      validate: function(value) {
        var pass = value.match(
          /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
        );
        if (pass) {
          return true;
        }
        return 'Please enter a valid email';
      }
    },
    {
      type: `input`,
      message: `What is your engineer's GitHub?`,
      name: `gitHub`,
      validate: function(value) {
        var pass = value.match(/^((?! ).)+$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a valid GitHub user name (no spaces)';
      }
    }
  ]);
  return engineer;
}

async function addIntern() {
  const intern = await inquirer.prompt([
    {
      type: 'input',
      message: `What is your intern's name?`,
      name: 'internName',
      validate: function(value) {
        var pass = value.match(/^([a-z-']+) ([a-z-']+(\.)?)( [a-z-']+)?$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a first and last name, middle name or initial optional';
      }
    },
    {
      type: 'input',
      message: `What is your intern's ID?`,
      name: `internId`,
      validate: function(value) {
        var pass = value.match(/^[0-9-]+$/i);
        if (pass) {
          return true;
        }
        return 'Please enter a number (hyphens allowed)';
      }
    },
    {
      type: `input`,
      message: `What is your intern's email?`,
      name: `internEmail`,
      validate: function(value) {
        var pass = value.match(
          /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
        );
        if (pass) {
          return true;
        }
        return 'Please enter a valid email';
      }
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

async function displayTeamPage(teamHeadings, teamStats) {
  const { projectName } = await inquirer.prompt({
    type: `input`,
    message: `What is your project name?`,
    name: `projectName`
  });
  console.log(`${projectName} team assembled! Loading...`);
  const projectNameForHTML = ` | Project Name: ${projectName}`;
  if (!fs.existsSync(`./output/${teamHeadings[0].name}-${projectName}`)) {
    fs.mkdir(`./output/${teamHeadings[0].name}-${projectName}`, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  const CSS = generateCSS();
  await writeFileAsync(
    `./output/${teamHeadings[0].name}-${projectName}/styles.css`,
    CSS,
    'utf8'
  );
  const JS = generateJavaScript(
    JSON.stringify(teamHeadings),
    JSON.stringify(teamStats)
  );
  await writeFileAsync(
    `./output/${teamHeadings[0].name}-${projectName}/scripts.js`,
    JS,
    'utf8'
  );
  const HTML = generateHTML(teamHeadings, projectNameForHTML);
  await writeFileAsync(
    `./output/${teamHeadings[0].name}-${projectName}/team.html`,
    HTML,
    'utf8'
  );
  open(`./output/${teamHeadings[0].name}-${projectName}/team.html`, {
    wait: true
  });
}

function generateHTML(team, projectName) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${team[0].name}'s Dev Team</title>
      <link rel="stylesheet" type="text/css" href="./styles.css" />
    </head>
    <body>
      <div id="header">
        <h1>Developement Team</h1>
        <h2>Manager: ${team[0].name}${projectName}</h2>
      </div>
      <div id="main">
        <div id="container">
          <div id="team-div"></div>
        </div>
      </div>
      <script src="./scripts.js"></script>
    </body>
  </html>
  `;
}

function generateJavaScript(teamHeadings, teamStats) {
  return `'use strict';
  const teamDiv = document.getElementById('team-div');
  const teamHeadingsArr = ${teamHeadings};
  const teamStatsArr = ${teamStats};
  
  console.log(teamHeadingsArr);
  console.log(teamStatsArr);
  for (let i = 0; i < teamHeadingsArr.length; ++i) {
    const teamMemberDiv = document.createElement('div');
    teamMemberDiv.setAttribute('class', 'teamMemberContainer');
    const teamMemberHeadDiv = document.createElement('div');
    teamMemberHeadDiv.setAttribute('class', 'teamMemberHeader');
    const newH3 = document.createElement('h3');
    newH3.textContent = teamHeadingsArr[i].role;
    teamMemberHeadDiv.appendChild(newH3);
    const newH4 = document.createElement('h4');
    newH4.textContent = teamHeadingsArr[i].name;
    teamMemberHeadDiv.appendChild(newH4);
    teamMemberDiv.appendChild(teamMemberHeadDiv)
    const teamMemberStatsDiv = document.createElement('div');
    teamMemberStatsDiv.setAttribute('class', 'teamMemberStats');
    for (const property in teamStatsArr[i]) {
      let key = property;
      let value = teamStatsArr[i][property];
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
          break;
        case 'school':
          key = 'School';
          break;
        case 'role':
          key = 'Role';
          break;
        default:
          key = 'undefined';
      }
      if (key === 'GitHub Profile') {
        value = '<a href="https://github.com/' +
        value +
        '" target="_blank">' +
        value +
        '</a>';
      }
      const newP = document.createElement('p');
      newP.innerHTML = '<span class="key">' + key + ':</span> ' + value;
      teamMemberStatsDiv.appendChild(newP);
    }
    teamMemberDiv.appendChild(teamMemberStatsDiv);
    teamDiv.appendChild(teamMemberDiv);
  }
  `;
}

function generateCSS() {
  return `body {
    margin: 0;
    padding: 0;
    font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
}

#header {
    width: 100%;
    background-color: #d67fcb;
    color: #53224d;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding: 20px 0;
    border-bottom: 8px solid #53224d;
    height: 130px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

#main {
    margin-top: 178px;
}

#container {
    margin: 0 auto;
    padding-top: 50px;
    width: 40%;
}

.teamMemberContainer {
    border: 3px solid #53224d;
    margin-bottom: 30px;
    position: relative;
}

.teamMemberHeader {
    background-color: #d67fcb;
    width: 100%;
    text-align: center;
    height: 90px;
    border-bottom: 3px solid #53224d;
}

.teamMemberHeader h3, .teamMemberHeader h4 {
    color: #53224d;
    margin: 0 20px;
    padding: 10px 0;
}

.teamMemberStats {
    background-color: #f5d4f0;
    color: #53224d;
}

.teamMemberStats p {
    margin: 0 20px;
    padding: 10px 0;
}

.teamMemberStats a {
    text-decoration: none;
}

.key {
    font-weight: bold;
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
