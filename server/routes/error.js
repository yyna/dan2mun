import express from 'express';
import Error from '../models/error';
import mongoose from 'mongoose';

const router = express.Router();

// Add Errors
/*
  WRITE ERROR: POST /api/error
  BODY SAMPLE: { username: "yyna", contents:"태극기 휘날리며 제목이 잘못 됐어용" }
  ERROR CODES:
    1. EMPTY ERRORS
*/
router.post('/', (req, res) => {
  if (typeof req.body.contents !== 'string') {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }

  let error = new Error({
    username: req.session.loginInfo.username,
    contents: req.body.contents
  });

  error.save ( err => {
    if(err) throw err;
    return res.json({ success: true });
  });
});

// View Errors
router.get('/', (req, res) => {
  Error.find()
  .sort({"_id": -1})
  .exec((err, errors) => {
    if(err) throw err;
    return res.json(errors);
  });
});

export default router;
