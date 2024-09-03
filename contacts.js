const chalk = require('chalk');
const fs = require('fs');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}
const loadContact = () => {
  const data = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
};

const saveContact = (name, email, phone) => {
  const contacts = loadContact();

  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold('Contact has already been registered. Please use other name.'),
    );
    return false;
  }

  if (email && !validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold('Invalid e-mail'));
    return false;
  }

  if (!validator.isMobilePhone(phone, 'id-ID')) {
    console.log(chalk.red.inverse.bold('Invalid phone number'));
    return false;
  }

  console.log(
    `\nContact name: ${name} \nPhone number: ${phone} \nE-mail: ${email ? email : 'N/A'}\n`,
  );
  contacts.push({ name, email, phone });

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts), (e) => {
    console.log(e);
  });

  console.log(chalk.green.inverse.bold('Contact has been saved!'));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold('\nContacts List'));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

const contactDetail = (name) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.name === name);

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${name} cannot be found.`));
    return false;
  }

  const { email, phone } = contact;

  console.log(name);
  console.log(phone);
  email ? console.log(email) : false;
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const index = contacts.findIndex((contact) => contact.name.toLowerCase() === name.toLowerCase());

  if (index === -1) {
    console.log(chalk.red.inverse.bold(`${name} cannot be found.`));
    return false;
  }

  contacts.splice(index, 1);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts), (e) => {
    console.log(e);
  });

  console.log(chalk.green.inverse.bold(`Contact ${name} has been deleted!`));
};

module.exports = { saveContact, listContact, contactDetail, deleteContact };
