const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middlewares/auth');
const AppError = require('../utils/AppError');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/image', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    throw new AppError('Please upload a file', 400);
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
  res.status(200).json({
    status: 'success',
    data: {
      url: url
    }
  });
});

module.exports = router;
