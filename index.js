'use strict';
require('dotenv').config();

const fs = require('fs');
const { Octokit } = require('@octokit/rest');

const { GH_TOKEN: githubToken } = process.env;
const octokit = new Octokit({ auth: `token ${githubToken}` });

const organizations = JSON.parse(fs.readFileSync('./json/organizations.json'));

const day = new Date().toLocaleDateString();

let newOrg = {...organizations};

async function main() {
  newOrg.updateTime = day;
  let arr = [];
  for (var i = 0; i < newOrg.data.length; i++) {
    let newNumber = await getNumber(newOrg.data[i]);
    arr.push({
      name: newOrg.data[i].name,
      code: newOrg.data[i].code,
      number: newNumber.length - 1,
      fullName: newOrg.data[i].fullName
    });
  }
  if (arr.length === organizations.data.length) {
    console.log('done!');
    newOrg.data = arr;
    fs.writeFileSync('./json/organizations.json', JSON.stringify(newOrg));
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
