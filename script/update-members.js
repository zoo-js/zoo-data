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
let totalNumber = 0;

async function main() {
  newMembers.updateTime = day;
  let arr = [];
  for (var i = 0; i < organizations.data.length; i++) {
    let newNumber = await getNumber(organizations.data[i]);
    let name = organizations.data[i].name;
    let orgNo = newNumber.length - 1;
    console.log(`Get ${name}: ${orgNo}`);
    totalNumber += orgNo;
    arr.push({
      name: organizations.data[i].name,
      number: orgNo
    });
  }
  if (arr.length === organizations.data.length) {
    console.log('done!');
    newMembers.data = arr;
    newMembers.totalNumber = totalNumber;
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

try {
  (async () => {
    await main();
  })();
} catch (err) {
  throw new Error('err');
}
