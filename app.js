'use strict';
const functions = require('./lib/functions');
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const inquirer = require('inquirer');

const finalTeam = [];

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
  addIntern() {
    console.log(`Intern added!`);
  }
  completeTeam() {
    console.log(`Team Complete!`);
    console.log(finalTeam);
  }
}

const team = new Team();

team.start();
