# employee-summary-team-builder

This app takes user input and will assemble a convenient organized webpage assimilation of the inputs to create a virtual 'rolo-dex' of the team members working on a project.

Check out the repo [here](https://github.com/agtravis/employee-summary-team-builder)!

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

The purpose of the app is so that a project manager can collect information about a team they have assembled, and generate a webpage containing all their relevant personal information for easy reference.

The app runs in Node.JS, and uses the CLI to prompt the user to enter details. The app utilizes JavaScript class constructors to fill the properties of the employee objects based on the prompts. Validation is provided via regex matches to ensure that the information will be consistent. Different roles have mostly relevant similar information, and specific different information per the role of the team member.

## Screenshots

![CLI](https://github.com/agtravis/node-resume-generator/blob/master/assets/images/CLI.PNG)
![finished](https://github.com/agtravis/node-resume-generator/blob/master/assets/images/output.PNG)

## Technologies

Here are the package.json dependencies:

    "dependencies": {
        "inquirer": "^7.0.4",
        "jest": "^25.1.0",
        "open": "^7.0.2"
    }

## Setup

This is an app that runs in node. The user should run `npm i`.

## Features

- Easy interface, with validation it's difficult for a user to make a syntax error (can't account for typos)
- straightforward design for quick reference of completed document
- dynamic directory and file names based on user input

## Status

Project is: Slightly above MVP. Unit tests had to be updated to accommodate a brief element that required something that the tests did not account for (a 'title' property of the constructor classes).

### Future Developement

- A feature that would enable information to be updated via the CLI (information is editable by accessing the html file in a text editor).
- A feature that would enact an option to use a relevant API to autopopulate certain info (for example for the engineer and with the github API).

## Contact

Created by [@agtravis](https://agtravis.github.io/)
