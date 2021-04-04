import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  points: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads', 'point_images'),
      filename(request, file, callback) {
        const hash = crypto.randomBytes(6).toString('hex');
  
        const filename = `${hash}-${file.originalname.replace(' ', '_')}`;
  
        callback(null, filename);
      }
    }),
  },
  items: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads'),
      filename(request, file, callback) {
        const hash = crypto.randomBytes(6).toString('hex');
  
        const filename = `${hash}-${file.originalname.replace(' ', '_')}`;
  
        callback(null, filename);
      }
    }),
  }
}