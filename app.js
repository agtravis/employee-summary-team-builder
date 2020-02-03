'use strict';
const functions = require('./lib/functions');
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');

const finalTeamHeadings = [];
const finalTeamStats = [];

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
    const newManagerHeadings = {
      role: this.manager.getRole(),
      name: this.manager.getName()
    };
    const newManagerStats = {
      id: this.manager.getId(),
      email: this.manager.getEmail(),
      officeNumber: this.manager.officeNumber
    };
    finalTeamHeadings.push(newManagerHeadings);
    finalTeamStats.push(newManagerStats);
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
    const newEngineerHeadings = {
      role: this.engineer.getRole(),
      name: this.engineer.getName()
    };
    const newEngineerStats = {
      id: this.engineer.getId(),
      email: this.engineer.getEmail(),
      gitHub: this.engineer.getGitHub()
    };
    finalTeamHeadings.push(newEngineerHeadings);
    finalTeamStats.push(newEngineerStats);
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
    const newInternHeadings = {
      role: this.intern.getRole(),
      name: this.intern.getName()
    };
    const newInternStats = {
      id: this.intern.getId(),
      email: this.intern.getEmail(),
      school: this.intern.getSchool()
    };
    finalTeamHeadings.push(newInternHeadings);
    finalTeamStats.push(newInternStats);
    this.addEmployee();
  }
  completeTeam() {
    console.log(`Team Complete!`);
    functions.displayTeamPage(finalTeamHeadings, finalTeamStats);
  }
}

const team = new Team();

team.start();
