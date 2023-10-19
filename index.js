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

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'Que proyecto desea generar?',
    choices: CHOICES,
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

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  console.log('\n---\n');
  console.log(`${color.yellow(`Creando proyecto, aguarde...`)}`);
  console.log('----------------------------');
  createDirectoryContents(templatePath, projectName);
  console.log('');
  console.log(`\n${color.yellow(`Proyecto creado:`)}\n`);
  console.log(`${color.green(`cd`)} ${projectName}`);
  if (projectChoice.toUpperCase().includes('[TS]') || projectChoice.toUpperCase().includes('[JS]')) {
    console.log(`${color.green(`npm`)} install`);
    console.log(`${color.green(`npm`)} run dev`);
  }
  console.log('\n---\n');
});
