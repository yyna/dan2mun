import express from 'express';
import Drama from '../models/drama';
import mongoose from 'mongoose';

const router = express.Router();

// Add Drama
/*
    WRITE DRAMA: POST /api/drama
    BODY SAMPLE: { title: "왕의 남자", director: "이준익", actors: [{"장생":"감우성"}, {"연산":"정진영"}, {"장녹수":"강성연"}, {"공길":"이준기"}], genre:"드라마", era:"조선", king:"연산군"}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
        3: NOT ADMIN
        4: DRAMA EXISTS
*/
router.post('/', (req, res) => {

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
        error: "NOT LOGGED IN",
        code: 1
      });
    }

    // CHECK TITLE VALID
    if(typeof req.body.title !== 'string') {
      return res.status(400).json({
        error: "EMPTY CONTENTS",
        code: 2
      });
    }

    // CHECK ADMIN
    if(req.session.loginInfo.username !== 'admin') {
      return res.status(403).json({
        error: "NOT ADMIN",
        code: 3
      });
    }

    // CHECK DRAMA EXISTANCE
    Drama.findOne({ title: req.body.title }, (err, exists) => {
      if (err) throw err;
      if (exists) {
        return res.status(409).json({
          error: "DRAMA EXISTS",
          code: 4
        });
      }

      // CREATE NEW DRAMA
      let drama = new Drama({
        title: req.body.title,
        director: req.body.director,
        actors: req.body.actors.replace(" ", ""),
        genre: req.body.genre,
        era: req.body.era,
        king: req.body.king,
        events: req.body.events,
        image: req.body.image
      });

      // SAVE IN DATABASE
      drama.save( err => {
        if(err) throw err;
        return res.json({ success: true });
      });
    });
});

/*
  MODIFY Drama: PUT /api/drama/:id
  BODY SAMPLE: { title: "왕의 남자", director: "이준익", actors: [{"장생":"감우성"}, {"연산":"정진영"}, {"장녹수":"강성연"}, {"공길":"이준기"}], genre:"드라마", era:"조선", king:"연산군"}
  ERROR CODES
    1: INVALID ID,
    2: EMPTY CONTENTS
    3: NOT LOGGED IN
    4: NO RESOURCE
    5: PERMISSION FAILURE
*/
router.put('/:id', (req, res) => {

});

/*
  DELETE DRAMA: DELETE /api/drama/:id
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
    });
  }

  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 2
    });
  }

  // FIND DRAMA AND CHECK FOR WRITER
  Drama.findById(req.params.id, (err, drama) => {
    if(err) throw err;

    if(!drama) {
      return res.status(404).json({
        error: "NO RESOURCE",
        code: 3
      });
    }
    if('admin' != req.session.loginInfo.username) {
      return res.status(403).json({
        error: "PERMISSION FAILURE",
        code: 4
      });
    }
    // REMOVE THE DRAMA
    Drama.remove({ _id: req.params.id }, err => {
      if(err) throw err;
      res.json({ success: true });
    });
  });

});

// Get drama list
router.get('/', (req, res) => {
  Drama.find()
  .sort({"_id": -1})
  .limit(6)
  .exec((err, dramas) => {
    if(err) throw err;
    res.json(dramas);
  });
});

/*
    READ ADDITIONAL (OLD/NEW) drama: GET /api/drama/:listType/:id
*/
router.get('/:listType/:id', (req, res) => {
  let listType = req.params.listType;
  let id = req.params.id;

  // CHECK LIST TYPE VALIDITY
  if(listType !== 'old' && listType !== 'new') {
    return res.status(400).json({
      error: "INVALID LISTTYPE",
      code: 1
    });
  }

  // CHECK DRAMA ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 2
    });
  }

  let objId = new mongoose.Types.ObjectId(req.params.id);

  if(listType === 'new') {
  // GET NEWER DRAMA
    Drama.find({ _id: { $gt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, dramas) => {
      if(err) throw err;
      return res.json(dramas);
    });
  } else {
  // GET OLDER DRAMA
  Drama.find({ _id: { $lt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, dramas) => {
      if(err) throw err;
      return res.json(dramas);
    });
  }
});

/*
  READ DRAMA OF A DIRECTOR: GET /api/drama/:director
*/
router.get('/:era', (req, res) => {
  Drama.find({era: req.params.era})
  .sort({'_id': -1})
  .limit(6)
  .exec((err, dramas) => {
    if(err) throw err;
    res.json(dramas);
  })
});

/*
  READ ADDITIONAL (OLD/NEW) DRAMA OF A USER: GET /api/drama/:director/:listType/:id
*/
router.get('/:era/:listType/:id', (req, res) => {
  let listType = req.params.listType;
  let id = req.params.id;

  // CHECK LIST TYPE VALIDITY
  if(listType !== 'old' && listType !== 'new') {
    return res.status(400).json({
      error: "INVALID LISTTYPE",
      code: 1
    });
  }

  // CHECK DRAMA ID VALIDITY
  if(mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 2
    });
  }

  let objId = new mongoose.Types.ObjectId(req.params.id);

  if(listType === 'new') {
    // GET NEWER DRAMA
    Drama.find({era: req.params.era, id: { $gt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, dramas) => {
      if(err) throw err;
      return res.json(dramas);
    });
  } else {
    // GET OLDER DRAMA
    Drama.find({era: req.params.era, id: {$lt: objId }})
    .sort({_id: -1})
    .limit(6)
    .exec((err, dramas) => {
      if(err) throw err;
      return res.json(dramas);
    });
  }
});

export default router;
