'use strict';

const employee = require('./employee');

class Engineer extends employee.Employee {
  constructor(name, id, title, email, github) {
    super(name, id, title, email);
    this.gitHub = github;
  }
  getGitHub() {
    return this.gitHub;
  }
  getRole() {
    return `Engineer`;
  }
}

module.exports = {
  Engineer
};
