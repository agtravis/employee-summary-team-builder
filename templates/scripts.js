'use strict';

const teamDiv = document.getElementById('team-div');

const teamAsObject = [{}];

const teamAsStrings = [
  '{"name":"George","id":"1985","title":"Manager","email":"agtravis@gmail.com","officeNumber":"999"}',
  '{"name":"Bruce Springsteen","id":"1970","title":"Engineer","email":"bruce@poops.com","gitHub":"bruce1234"}',
  '{"name":"Conan","id":"6969","title":"Intern","email":"coco@butthutt.com","school":"School of hard knocks"}'
];

const team = [];

for (const individual of teamAsStrings) {
  const person = JSON.parse(individual);
  team.push(person);
}
console.log(team);

for (let i = 0; i < team.length; ++i) {
  const newDiv = document.createElement('div');
  const newHeading = document.createElement('h5');
  newHeading.textContent = team[i].title; // change to method
  newDiv.appendChild(newHeading);
  for (const property in team[i]) {
    const key = property;
    const value = team[i][property];
    const newP = document.createElement('p');
    newP.innerHTML = `<span class="key">${key}:</span> ${value}`;
    newDiv.appendChild(newP);
  }
  teamDiv.appendChild(newDiv);
}
