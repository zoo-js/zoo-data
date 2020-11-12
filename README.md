# zoo-data
🍩 The data for zoo-js.

## 🎉 How to use ?

Request the raw address of the json file via http.

## 🌟 JSON

### 🎈 organizations

#### `name`

The name of pet organization.

#### `code`

The logo code of pet organization.

Use like: `https://avatars0.githubusercontent.com/u/${code}?s=100&v=4`

#### `fullName`

The organization full name.

#### `cnName`

The organization Chinese name.

### 🎈 members

#### `name`

The name of pet organization.

#### `number`

The number of people in the pet organization.

## 🌈 script

### 🔥 update-members

Update the number of members according to `organizations.json`.

## 🖇 shell

### 📎 sync-fork

Bulk update `zoo` fork. Sorry, only I have permission. And this doesn't work on GitHub Actions.

## 💬 How it work?

1. Copy `test.env` to `.env`
2. Create a token with the `org` scope and copy it (https://github.com/settings/tokens/new)
3. `yarn`
4. `node ./script/xxx.js`

- In here, it will auto play with GitHub Actions.
