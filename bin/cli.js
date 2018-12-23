#!/usr/bin/env node
const program = require('commander');
const validUrl = require('valid-url');
const init = require('../index');

console.log(`NODE JS process version is: ${process.version}`);

let voteValue = '';

program
  .version('1.0.0')
  .arguments('<vote>')
  .option('-u, --url <url>', 'Page url (required)')
  .option('-v, --votes [votes]', 'Number of votes, default 100', parseInt, 100)
  .option('-t, --timeout [timeout]', 'Time to wait after page load, default 10, in seconds', parseInt, 10)
  .option('-r, --response [response]', 'Time to wait for form response, default 10, in seconds', parseInt, 10)
  .option('-l, --limit [limit]', 'Limit number of browsers to open at once, default 10', parseInt, 10)
  .option('-c, --cookie [cookie]', 'Name of the cookie, default `tpc_1539354118305`', 'tpc_1539354118305')
  .option('-h, --headless [headless]', 'is browser headless, default true', true)
  .action((vote) => {
     voteValue = vote;
  });

program.parse(process.argv);

const cliOptions = {
  url: program.url,
  cookie: program.cookie,
  limit: program.limit,
  total: program.votes,
  timeout: program.timeout,
  response: program.response,
  headless: program.headless
};

const isValid = (vote) => {
  return vote === 'da' || vote === 'ne';
};

if (!validUrl.isUri(program.url)) {
  console.log('Please provide valid url');
  console.log('Input:', program.url);
  program.outputHelp();

  process.exit(1);
}

if (!isValid(voteValue)) {
  console.log('Please provide valid vote: da/ne');
  console.log('Input:', voteValue);
  program.outputHelp();

  process.exit(1);
}

console.log(`PARAMETERS:`);
console.log(cliOptions);

init(voteValue, cliOptions);
