'use strict';

const intern = require('../lib/intern');

describe('Intern methods', () => {
  test('Should be George', () => {
    const george = new intern.Intern('George', 0, 'Manager', 'a@b.com', 'UW');
    const actual = george.getName();
    expect(actual).toEqual('George');
  });

  test('Should be 0', () => {
    const george = new intern.Intern('George', 0, 'Manager', 'a@b.com', 'UW');
    const actual = george.getId();
    expect(actual).toEqual(0);
  });

  test('Should be a@b.com', () => {
    const george = new intern.Intern('George', 0, 'Manager', 'a@b.com', 'UW');
    const actual = george.getEmail();
    expect(actual).toEqual('a@b.com');
  });

  test('Should be UW', () => {
    const george = new intern.Intern('George', 0, 'Manager', 'a@b.com', 'UW');
    const actual = george.getSchool();
    expect(actual).toEqual('UW');
  });

  test('Should be Intern', () => {
    const george = new intern.Intern('George', 0, 'Manager', 'a@b.com', 'UW');
    const actual = george.getRole();
    expect(actual).toEqual('Intern');
  });
});
