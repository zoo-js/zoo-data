require('dotenv').config();
const fs = require('fs');
const { Octokit } = require('@octokit/rest');

const {
  GH_TOKEN: githubToken,
} = process.env;

const octokit = new Octokit({ auth: `token ${githubToken}` });

let organizations = JSON.parse(fs.readFileSync('./json/organizations.json'));
organizations = organizations.data;

const repo = 'zoo';

async function main() {
  for (let i = 0; i < organizations.length; i++) {
    let pet = organizations[i].fullName;
    console.log(`${pet}: start`);
    console.time(`${pet}`);
    try {
      const res = await octokit.repos.get({
        owner: pet,
        repo
      });
      if(res.data.id) {
        await octokit.repos.delete({
          owner: pet,
          repo
        })
      };
    } catch(err) {}
    await octokit.repos.createFork({
      owner: 'zoo-js',
      repo,
      organization: pet
    });
    console.log(`${pet}: done`);
    console.timeEnd(`${pet}`);
  }
  console.log(`Finish !`);
};

(async () => {
  await main();
})();
