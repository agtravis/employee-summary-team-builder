'use strict';
const functions = require('./lib/functions');
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');
const inquirer = require('inquirer');

const finalTeam = [];
const finalTeamAsString = [];

class Team {
  constructor() {}
  async start() {
    console.log('Team building commencing...');
    const managerInfo = await functions.addManager();
    this.manager = new manager.Manager(
      managerInfo.managerName,
      managerInfo.managerId,
      'Manager',
      managerInfo.managerEmail,
      managerInfo.officeNumber
    );
    // console.log(this.manager);
    // console.log(this.manager.getRole());
    finalTeam.push(this.manager);
    this.addEmployee();
  }
  async addEmployee() {
    const shouldContinue = await functions.shouldContinue();
    switch (shouldContinue) {
      case `engineer`:
        this.addEngineer();
        break;
      case `intern`:
        this.addIntern();
        break;
      default:
        this.completeTeam();
    }
  }
  async addEngineer() {
    const engineerInfo = await functions.addEngineer();
    this.engineer = new engineer.Engineer(
      engineerInfo.engineerName,
      engineerInfo.engineerId,
      'Engineer',
      engineerInfo.engineerEmail,
      engineerInfo.gitHub
    );
    finalTeam.push(this.engineer);
    this.addEmployee();
  }
  async addIntern() {
    const internInfo = await functions.addIntern();
    this.intern = new intern.Intern(
      internInfo.internName,
      internInfo.internId,
      'Intern',
      internInfo.internEmail,
      internInfo.school
    );
    finalTeam.push(this.intern);
    this.addEmployee();
  }
  completeTeam() {
    console.log(`Team Complete!`);
    for (const individual of finalTeam) {
      const individualAsString = JSON.stringify(individual);
      // console.log(individualAsString);
      finalTeamAsString.push(individualAsString);
    }
    console.log(finalTeamAsString);
    // console.log(finalTeam);
    // console.log(finalTeam[0].getRole());
    // functions.displayTeamPage(finalTeam);
  }
}

const team = new Team();

team.start();
