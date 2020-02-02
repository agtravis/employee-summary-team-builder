'use strict';

const functions = require('./lib/functions');
const manager = require('./lib/manager');
const inquirer = require('inquirer');

class Team {
  constructor() {}
  async start() {
    const managerInfo = await functions.addManager();
    this.manager = new manager.Manager(
      managerInfo.managerName,
      managerInfo.managerId,
      'Manager',
      managerInfo.managerEmail,
      managerInfo.officeNumber
    );
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
  addEngineer() {
    console.log(`Engineer added!`);
  }
  addIntern() {
    console.log(`Intern added!`);
  }
  completeTeam() {
    console.log(`Team Complete!`);
  }
}

const team = new Team();

team.start();
