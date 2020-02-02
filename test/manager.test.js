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
