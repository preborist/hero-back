const fs = require('fs/promises');

class Upload {
  constructor(uploudCloud) {
    this.uploudCloud = uploudCloud;
  }

  async saveImagesToCloud({ pathFile, name, oldFile }) {}

  async deleteTempororyFile(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Upload;
