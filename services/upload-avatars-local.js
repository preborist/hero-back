const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const createFolderIsNotExist = require('../helpers/create-dir');
class Upload {
  constructor(IMAGES_OF_HEROES) {
    this.IMAGES_OF_HEROES = IMAGES_OF_HEROES;
  }

  async transformImage(pathFile) {
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

  async saveImageToStatic({ idHero, pathFile, name, oldFile }) {
    await this.transformImage(pathFile);
    const folderHeroImages = path.join('public', this.IMAGES_OF_HEROES, idHero);
    await createFolderIsNotExist(folderHeroImages);
    await fs.rename(pathFile, path.join(folderHeroImages, name));
    await this.deleteOldImage(
      path.join(process.cwd(), this.IMAGES_OF_HEROES, oldFile),
    );
    const imageURL = path.normalize(path.join(idHero, name));
    return imageURL;
  }

  async deleteOldImage(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Upload;
