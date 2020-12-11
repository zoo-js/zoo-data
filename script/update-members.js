'use strict';
require('dotenv').config();

const fs = require('fs');
const { Octokit } = require('@octokit/rest');

const { GH_TOKEN: githubToken } = process.env;
const octokit = new Octokit({ auth: `token ${githubToken}` });

const organizations = JSON.parse(fs.readFileSync('./json/organizations.json'));
const members = JSON.parse(fs.readFileSync('./json/members.json'));

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const now = `${year}-${month}-${day}`;

let newMembers = {...members};
let totalNumber = 0;
let allUsers = [];

async function main() {
  newMembers.updateTime = now;
  let arr = [];

  for (var i = 0; i < organizations.data.length; i++) {
    let name = organizations.data[i].name;
    let newNumber = await getNumber(organizations.data[i]);
    const orgNo = newNumber.length - 1;
    console.log(`Get ${name}: ${orgNo}`);

    newNumber.forEach(item => {
      if (item.type === 'User' && item.login !== 'zoo-js-bot' && !allUsers.includes(item.login)) {
        allUsers.push(item.login);
        totalNumber += 1;
      }
    })

    arr.push({
      name,
      number: orgNo
    });
  }

  if (arr.length === organizations.data.length) {
    console.log('All query done!');
    newMembers.data = arr;

    newMembers.total.push({
      year,
      month,
      day,
      number: totalNumber
    });

    console.log(`${now} < ${totalNumber} >`);
    fs.writeFileSync('./json/members.json', JSON.stringify(newMembers, null, 2));
  }
}

async function getNumber(org) {
  let res;
  try {
   res = await octokit.orgs.listMembers({ org: org.fullName });
  } catch (error) {
    console.error(`Unable to get member!\n${error}`);
  }
  return res.data;
};

try {
  (async () => {
    await main();
  })();
} catch (err) {
  throw new Error('err');
}
