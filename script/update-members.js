'use strict';
require('dotenv').config();

const fs = require('fs');
const { Octokit } = require('@octokit/rest');

const { GH_TOKEN: githubToken } = process.env;
const octokit = new Octokit({ auth: `token ${githubToken}` });

const organizations = JSON.parse(fs.readFileSync('./json/organizations.json'));
const members = JSON.parse(fs.readFileSync('./json/members.json'));

const day = new Date().toLocaleDateString();

let newMembers = {...members};

async function main() {
  newMembers.updateTime = day;
  let arr = [];
  for (var i = 0; i < organizations.data.length; i++) {
    let newNumber = await getNumber(organizations.data[i]);
    console.log(`Get! ${i}`);
    arr.push({
      name: organizations.data[i].name,
      number: newNumber.length - 1
    });
  }
  if (arr.length === organizations.data.length) {
    console.log('done!');
    newMembers.data = arr;
    fs.writeFileSync('./json/members.json', JSON.stringify(newMembers));
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

(async () => {
  await main();
})();
