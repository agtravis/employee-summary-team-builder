'use strict';

  const teamDiv = document.getElementById('team-div');
  
  const teamAsObject = [{}];
  
  const team = [];
  
  for (const individual of [{"name":"a","id":"a","title":"Manager","email":"a","officeNumber":"a"},{"name":"a","id":"a","title":"Engineer","email":"a","gitHub":"agtravis"}]) {
    const person = individual;
    team.push(person);
  }
  console.log(team);
  
  for (let i = 0; i < team.length; ++i) {
    const newDiv = document.createElement('div');
    const newHeading = document.createElement('h5');
    newHeading.textContent = team[i].title; // change to method
    newDiv.appendChild(newHeading);
    for (const property in team[i]) {
      let key = property;
      let value = team[i][property];
      const newP = document.createElement('p');
      switch (key) {
        case 'name':
          key = 'Employee Name';
          break;
        case 'id':
          key = 'Employee ID#';
          break;
        case 'title':
          key = 'Position';
          break;
        case 'email':
          key = 'Contact';
          break;
        case 'officeNumber':
          key = 'Office Number';
          break;
        case 'gitHub':
          key = 'GitHub Profile';
          value = '<a href="https://github.com/' + value + '" target="_blank">' + value + '</a>';
          break;
        case 'school':
          key = 'School';
          break;
        // case 'role' :
        //   key = 'Role';
        //   break;
        default:
          key = 'undefined';
      }  
      newP.innerHTML = '<span class="key">' + key + ':</span> ' + value;
      newDiv.appendChild(newP);
    }
    teamDiv.appendChild(newDiv);
  }
  