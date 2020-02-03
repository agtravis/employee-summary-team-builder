'use strict';

const employee = require('./employee');

class Manager extends employee.Employee {
  constructor(name, id, title, email, officeNumber) {
    super(name, id, title, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return `Manager`;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = {
  Manager
};
