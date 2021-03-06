'use strict';
  const teamDiv = document.getElementById('team-div');
  const teamHeadingsArr = [{"role":"Manager","name":"George Travis"},{"role":"Engineer","name":"Bruce P. Springsteen"},{"role":"Intern","name":"Conan O'Brien"}];
  const teamStatsArr = [{"id":"1101-01","email":"agtravis85@gmail.com","officeNumber":"2064655911"},{"id":"1101-02","email":"bruce@borntorun.com","gitHub":"agtravis"},{"id":"1101-03","email":"con@n.com","school":"UW"}];
  
  console.log(teamHeadingsArr);
  console.log(teamStatsArr);
  for (let i = 0; i < teamHeadingsArr.length; ++i) {
    const teamMemberDiv = document.createElement('div');
    teamMemberDiv.setAttribute('class', 'teamMemberContainer');
    const teamMemberHeadDiv = document.createElement('div');
    teamMemberHeadDiv.setAttribute('class', 'teamMemberHeader');
    const newH3 = document.createElement('h3');
    newH3.textContent = teamHeadingsArr[i].role;
    teamMemberHeadDiv.appendChild(newH3);
    const newH4 = document.createElement('h4');
    newH4.textContent = teamHeadingsArr[i].name;
    teamMemberHeadDiv.appendChild(newH4);
    teamMemberDiv.appendChild(teamMemberHeadDiv)
    const teamMemberStatsDiv = document.createElement('div');
    teamMemberStatsDiv.setAttribute('class', 'teamMemberStats');
    for (const property in teamStatsArr[i]) {
      let key = property;
      let value = teamStatsArr[i][property];
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
          break;
        case 'school':
          key = 'School';
          break;
        case 'role':
          key = 'Role';
          break;
        default:
          key = 'undefined';
      }
      if (key === 'GitHub Profile') {
        value = '<a href="https://github.com/' +
        value +
        '" target="_blank">' +
        value +
        '</a>';
      }
      const newP = document.createElement('p');
      newP.innerHTML = '<span class="key">' + key + ':</span> ' + value;
      teamMemberStatsDiv.appendChild(newP);
    }
    teamMemberDiv.appendChild(teamMemberStatsDiv);
    teamDiv.appendChild(teamMemberDiv);
  }
  