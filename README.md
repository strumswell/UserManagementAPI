# UserManagementAPI
 Very basic API build using node.js and Express connected to a MySQL database. This API was created for a demo webshop and includes many operations for working with user data. Security was out of scope in this project.

## Dependencies
- node.js
- npm

## Setting up the API
1. Clone this repository with `git clone https://github.com/strumswell/UserManagementAPI.git`
2. Install node packages with `npm install`
3. Create .env with the following content:
```
NODE_ENV=development
SQL_HOST=''
SQL_USER=''
SQL_PASSWORD=''
SQL_DATABASE=''
MAIL_USER=''
MAIL_PASSWORD=''
API_BASE_URL='https://api.example.com/'
AVATAR_LOCAL_PATH=''
AVATAR_PUBLIC_PATH='http://avatar.example.com'
```
4. Execute the app with `node app.js`

![docs](./img/screenshot.png)
