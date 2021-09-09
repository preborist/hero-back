const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const createFolderIsNotExist = require('../helpers/create-dir');
class Upload {
  constructor(IMAGES_OF_HEROES) {
    this.IMAGES_OF_HEROES = IMAGES_OF_HEROES;
  }

  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile);
    await file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }

  async saveAvatarToStatic({ idUser, pathFile, name, oldFile }) {
    await this.transformAvatar(pathFile);
    const folderUserAvatar = path.join('public', this.IMAGES_OF_HEROES, idUser);
    await createFolderIsNotExist(folderUserAvatar);
    await fs.rename(pathFile, path.join(folderUserAvatar, name));
    await this.deleteOldAvatar(
      path.join(process.cwd(), this.IMAGES_OF_HEROES, oldFile),
    );
    const avatarURL = path.normalize(path.join(idUser, name));
    return avatarURL;
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Upload;
