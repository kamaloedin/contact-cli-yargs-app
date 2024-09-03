const yargs = require('yargs');
const { saveContact, listContact, contactDetail, deleteContact } = require('./contacts');

yargs
  .command({
    command: 'add',
    description: 'Add new contact',
    builder: {
      name: {
        describe: 'Full name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'E-mail address',
        demandOption: false,
        type: 'string',
      },
      phone: {
        describe: 'Phone number',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      const { name, email, phone } = argv;
      saveContact(name, email, phone);
    },
  })
  .demandCommand();

yargs.command({
  command: 'list',
  description: 'List name & phone number of all contacts',
  handler() {
    listContact();
  },
});

yargs.command({
  command: 'detail',
  description: 'Show contact detail by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contactDetail(argv.name);
  },
});

yargs.command({
  command: 'delete',
  description: 'Delete contact by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});

yargs.parse();
