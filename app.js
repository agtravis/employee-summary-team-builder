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
  }
}

const team = new Team();

team.start();
