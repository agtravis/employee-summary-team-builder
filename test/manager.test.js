const manager = require('../lib/manager');

describe('Manager methods', () => {
  test('Should be George', () => {
    const george = new manager.Manager('George', 0, 'Manager', 'a@b.com', 25);
    const actual = george.getName();
    expect(actual).toEqual('George');
  });

  test('Should be 0', () => {
    const george = new manager.Manager('George', 0, 'Manager', 'a@b.com', 25);
    const actual = george.getId();
    expect(actual).toEqual(0);
  });

  test('Should be a@b.com', () => {
    const george = new manager.Manager('George', 0, 'Manager', 'a@b.com', 25);
    const actual = george.getEmail();
    expect(actual).toEqual('a@b.com');
  });

  test('Should be 25', () => {
    const george = new manager.Manager('George', 0, 'Manager', 'a@b.com', 25);
    const actual = george.officeNumber;
    expect(actual).toEqual(25);
  });

  test('Should be Manager', () => {
    const george = new manager.Manager('George', 0, 'Manager', 'a@b.com', 25);
    const actual = george.getRole();
    expect(actual).toEqual('Manager');
  });
});

describe('assignment tests', () => {
  test('Can set office number via constructor argument', () => {
    const testValue = 100;
    const man = new manager.Manager(
      'Foo',
      1,
      'Manager',
      'test@test.com',
      testValue
    );
    expect(man.officeNumber).toBe(testValue);
  });

  test('getRole() should return "Manager"', () => {
    const testValue = 'Manager';
    const man = new manager.Manager('Foo', 1, 'test@test.com', 100);
    expect(man.getRole()).toBe(testValue);
  });

  test('Can get office number via getOffice()', () => {
    const testValue = 100;
    const man = new manager.Manager(
      'Foo',
      1,
      'Manager',
      'test@test.com',
      testValue
    );
    expect(man.getOfficeNumber()).toBe(testValue);
  });
});
