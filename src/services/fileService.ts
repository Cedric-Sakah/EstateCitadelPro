import fs from 'fs';
import path from 'path';

export class FileService {
  static uploadDir = path.join(__dirname, '../../uploads');

  static ensureUploadDirExists() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  static saveFile(file: Express.Multer.File): { path: string; mimetype: string } {
    this.ensureUploadDirExists();
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);
    return { path: filePath, mimetype: file.mimetype };
  }

  static deleteFile(filePath: string) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}