import { Request, Response, NextFunction } from 'express';
import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { protect } from '../middlewares/auth';
import AppError from '../utils/AppError';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'public/uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/image', protect, upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a file', 400);
    }

    const filePath = req.file.path;

    // Post-process: resize to 600x600 square with white background, output as JPEG
    try {
      const resizedBuffer = await sharp(filePath)
        .resize(600, 600, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({ quality: 90 })
        .toBuffer();

      await fs.writeFile(filePath, resizedBuffer);
    } catch (resizeError) {
      // If resize fails, keep the original file and continue
      console.error('Image resize failed, keeping original:', resizeError);
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      data: {
        url: url
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
