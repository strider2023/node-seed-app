# node-seed-app

Sample node seed app for quick project startup. This has express installed and code references on how to connect with different databases and perform various REST based operations.

Currently the application uses a Sqlite database for all operations. Fork it for your custom implementation.

### Running your app in local machine

From your terminal type the following command under your root folder,
- npm start

### Heroku Deployment Steps

If you have a Heroku account, after committing your latest changes follow the steps given below,

- heroku login
- heroku apps:create node-seed-app --buildpack heroku/nodejs
- git push heroku master
- heroku open

To make sure your instance is still running
- heroku ps:scale web=1

To check server logs
- heroku logs --tail
