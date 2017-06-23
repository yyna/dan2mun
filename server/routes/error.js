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

/*
  DELETE ERROR: DELETE /api/error/:id
  ERROR CODES
    1: INVALID ID
    2: NOT LOGGED IN
    3: NO RESOURCE
    4: PERMISSION FAILURE
*/
router.delete('/:id', (req, res) => {
  // CHECK DRAMA ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    })
  }

  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 2
    })
  }

  // FIND ERROR AND CHECK FOR WRITER
  Error.findById(req.params.id, (err, error) => {
    if(err) throw err;

    if(!error) {
      return res.status(404).json({
        error: "NO RESOURCE",
        code: 3
      });
    }
    if ('admin' != req.session.loginInfo.username) {
      return res.status(403).json({
        error: "PERMISSION FAILURE",
        code: 4
      });
    }

    // REMOVE THE ERROR
    Error.remove({ _id: req.params.id }, err => {
      if(err) throw err;
      res.json({success: true});
    });
  });
});

export default router;
