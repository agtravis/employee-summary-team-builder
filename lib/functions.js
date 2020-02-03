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

async function displayTeamPage(teamHeadings, teamStats) {
  const { projectName } = await inquirer.prompt({
    type: `input`,
    message: `What is your project name?`,
    name: `projectName`
  });
  const projectNameForHTML = ` | Project Name: ${projectName}`;
  const HTML = generateHTML(teamHeadings, projectNameForHTML);
  if (!fs.existsSync(`${teamHeadings[0].name}-${projectName}`)) {
    fs.mkdir(`${teamHeadings[0].name}-${projectName}`, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  await writeFileAsync(
    `${teamHeadings[0].name}-${projectName}/team.html`,
    HTML,
    'utf8'
  );
  const JS = generateJavaScript(
    JSON.stringify(teamHeadings),
    JSON.stringify(teamStats)
  );
  await writeFileAsync(
    `${teamHeadings[0].name}-${projectName}/scripts.js`,
    JS,
    'utf8'
  );
  const CSS = generateCSS();
  await writeFileAsync(
    `${teamHeadings[0].name}-${projectName}/styles.css`,
    CSS,
    'utf8'
  );
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
