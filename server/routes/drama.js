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
*/
router.post('/add', (req, res) => {
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

    if(req.body.director === "") {
      return res.status(400).json({
        error: "EMPTY CONTENTS",
        code: 2
      });
    }

    // CREATE NEW DRAMA
    let drama = new Drama({
      title: req.body.title,
      director: req.body.director,
      actors: req.body.actors,
      genre: req.body.genre,
      era: req.body.era,
      from: req.body.from,
      to: req.body.to,
      events: req.body.events
    });

    // SAVE IN DATABASE
    drama.save( err => {
      if(err) throw err;
      return res.json({ success: true });
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

export default router;
