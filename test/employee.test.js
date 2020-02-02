const employee = require('../lib/employee');

describe('Employee methods', () => {
  test('Should be George', () => {
    const george = new employee.Employee('George', 0, 'Manager', 'a@b.com');
    const actual = george.getName();
    expect(actual).toEqual('George');
  });

  test('Should be 0', () => {
    const george = new employee.Employee('George', 0, 'Manager', 'a@b.com');
    const actual = george.getId();
    expect(actual).toEqual(0);
  });

  test('Should be a@b.com', () => {
    const george = new employee.Employee('George', 0, 'Manager', 'a@b.com');
    const actual = george.getEmail();
    expect(actual).toEqual('a@b.com');
  });

  test('Should be Employee', () => {
    const george = new employee.Employee('George', 0, 'Manager', 'a@b.com');
    const actual = george.getRole();
    expect(actual).toEqual('Employee');
  });
});
