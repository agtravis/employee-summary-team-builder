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

describe('assignment tests', () => {
  test('Can instantiate Employee instance', () => {
    const emp = new employee.Employee();
    expect(typeof emp).toBe('object');
  });

  test('Can set name via constructor arguments', () => {
    const name = 'Alice';
    const emp = new employee.Employee(name);
    expect(emp.name).toBe(name);
  });

  test('Can set id via constructor argument', () => {
    const testValue = 100;
    const emp = new employee.Employee('Foo', testValue);
    expect(emp.id).toBe(testValue);
  });

  test('Can set email via constructor argument', () => {
    const testValue = 'test@test.com';
    const emp = new employee.Employee('Foo', 1, 'Employee', testValue);
    expect(emp.email).toBe(testValue);
  });

  test('Can get name via getName()', () => {
    const testValue = 'Alice';
    const emp = new employee.Employee(testValue);
    expect(emp.getName()).toBe(testValue);
  });

  test('Can get id via getId()', () => {
    const testValue = 100;
    const emp = new employee.Employee('Foo', testValue);
    expect(emp.getId()).toBe(testValue);
  });

  test('Can get email via getEmail()', () => {
    const testValue = 'test@test.com';
    const emp = new employee.Employee('Foo', 1, 'Employee', testValue);
    expect(emp.getEmail()).toBe(testValue);
  });

  test('getRole() should return "Employee"', () => {
    const testValue = 'Employee';
    const emp = new employee.Employee('Alice', 1, 'test@test.com');
    expect(emp.getRole()).toBe(testValue);
  });
});
