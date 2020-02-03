const engineer = require('../lib/engineer');

describe('Engineer methods', () => {
  test('Should be George', () => {
    const george = new engineer.Engineer(
      'George',
      0,
      'Manager',
      'a@b.com',
      'agtravis'
    );
    const actual = george.getName();
    expect(actual).toEqual('George');
  });

  test('Should be 0', () => {
    const george = new engineer.Engineer(
      'George',
      0,
      'Manager',
      'a@b.com',
      'agtravis'
    );
    const actual = george.getId();
    expect(actual).toEqual(0);
  });

  test('Should be a@b.com', () => {
    const george = new engineer.Engineer(
      'George',
      0,
      'Manager',
      'a@b.com',
      'agtravis'
    );
    const actual = george.getEmail();
    expect(actual).toEqual('a@b.com');
  });

  test('Should be agtravis', () => {
    const george = new engineer.Engineer(
      'George',
      0,
      'Manager',
      'a@b.com',
      'agtravis'
    );
    const actual = george.getGitHub();
    expect(actual).toEqual('agtravis');
  });

  test('Should be Engineer', () => {
    const george = new engineer.Engineer(
      'George',
      0,
      'Manager',
      'a@b.com',
      'agtravis'
    );
    const actual = george.getRole();
    expect(actual).toEqual('Engineer');
  });
});

describe('assigned tests', () => {
  test('Can set GitHUb account via constructor', () => {
    const testValue = 'GitHubUser';
    const engin = new engineer.Engineer(
      'Foo',
      1,
      'Engineer',
      'test@test.com',
      testValue
    );
    expect(engin.getGitHub()).toBe(testValue);
  });

  test('getRole() should return "Engineer"', () => {
    const testValue = 'Engineer';
    const engin = new engineer.Engineer(
      'Foo',
      1,
      'test@test.com',
      'GitHubUser'
    );
    expect(engin.getRole()).toBe(testValue);
  });

  test('Can get GitHub username via getGithub()', () => {
    const testValue = 'GitHubUser';
    const engin = new engineer.Engineer(
      'Foo',
      1,
      'Engineer',
      'test@test.com',
      testValue
    );
    expect(engin.getGitHub()).toBe(testValue);
  });
});
