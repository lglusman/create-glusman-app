#!/usr/bin/env node

import inquirer from 'inquirer';
import color from 'picocolors';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const THECHOICES = CHOICES.map(x => ({
  name: x.split('[')[0].replaceAll('-', ' ').replaceAll('_', ' '),
  value: x,
}));

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'Que proyecto desea generar?',
    choices: THECHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Nombre del proyecto:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return 'El nombre del proyecto solo puede incluir letras, números, guiones bajos y almohadillas(#).';
    },
  },
];

const consoleFinish = projectype => {
  switch (projectype.toLowerCase()) {
    case 'ts':
      console.log(`${color.green(`npm`)} install`);
      console.log(`${color.green(`npm`)} run dev`);
      break;
    case 'js':
      console.log(`${color.green(`npm`)} install`);
      console.log(`${color.green(`npm`)} run dev`);
      break;
    case 'instalador':
      console.log(`${color.green(`setup.exe`)}`);
      break;
    case '.net':
      console.log(`${color.green(`open solution .sln`)}`);
      break;
    default:
      break;
  }
};

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  console.log(`${color.yellow(`Creando proyecto, aguarde...`)}`);
  console.log('----------------------------');
  createDirectoryContents(templatePath, projectName, projectName);
  console.log('');
  console.log(`\n${color.yellow(`Proyecto creado:`)}\n`);
  console.log(`${color.green(`cd`)} ${projectName}`);
  // if (
  //   projectChoice.toUpperCase().includes('[TS]') ||
  //   projectChoice.toUpperCase().includes('[JS]')
  // ) {
  //   console.log(`${color.green(`npm`)} install`);
  //   console.log(`${color.green(`npm`)} run dev`);
  // }
  const regExp = /\[([^)]+)\]/;
  const matches = regExp.exec(projectChoice);
  const tipo = matches[1];
  consoleFinish(tipo);
});
