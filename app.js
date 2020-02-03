'use strict';
const functions = require('./lib/functions');
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');

const finalTeam = [];
const finalTeamAsString = [];
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
      id: this.manager.getName(),
      email: this.manager.getEmail(),
      officeNumber: this.manager.officeNumber
    };
    // this.manager.role = this.manager.getRole(); // leave commented out
    finalTeam.push(this.manager);
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
      id: this.engineer.getName(),
      email: this.engineer.getEmail(),
      gitHub: this.engineer.getGitHub()
    };
    finalTeam.push(this.engineer);
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
      id: this.intern.getName(),
      email: this.intern.getEmail(),
      school: this.intern.getSchool()
    };
    finalTeam.push(this.intern);
    finalTeamHeadings.push(newInternHeadings);
    finalTeamStats.push(newInternStats);
    this.addEmployee();
  }
  completeTeam() {
    console.log(`Team Complete!`);
    console.log(finalTeamHeadings);
    console.log(finalTeamStats);
    for (const individual of finalTeam) {
      const individualAsString = JSON.stringify(individual);
      // console.log(individualAsString);
      finalTeamAsString.push(individualAsString);
    }
    // console.log(finalTeamAsString);
    // console.log(finalTeam);
    // console.log(finalTeam[0].getRole());
    // functions.displayTeamPage(finalTeam, finalTeamAsString);
  }
}

const team = new Team();

team.start();
