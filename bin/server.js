const app = require('../app');
const db = require('../model/db');
const createFolderIsNotExist = require('../helpers/create-dir');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const IMAGES_OF_HEROES = process.env.IMAGES_OF_HEROES;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(IMAGES_OF_HEROES);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not run. Error: ${err.message}`);
  process.exit(1);
});
