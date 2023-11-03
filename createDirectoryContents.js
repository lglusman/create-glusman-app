import * as fs from 'fs';
const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath, projectname) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      if (file.endsWith('.exe') || file.endsWith('.msi')) {
        console.log('first')
        //fs.copyFile(origFilePath, writePath);
        fs.copyFileSync(origFilePath, writePath)

        console.log('second')
      } else {
        const contents = fs.readFileSync(origFilePath, 'utf8');

        const finalcontents = contents.replace(/{{name}}/g, projectname);

        // Rename
        if (file === '.npmignore') file = '.gitignore';

        fs.writeFileSync(writePath, finalcontents, 'utf8');
      }
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, projectname);
    }
  });
};

export default createDirectoryContents;
