'use strict';

const employee = require('./employee');

class Intern extends employee.Employee {
  constructor(name, id, title, email, school) {
    super(name, id, title, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return `Intern`;
  }
}

module.exports = {
  Intern
};
