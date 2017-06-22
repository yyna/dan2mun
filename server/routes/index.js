import express from 'express';
import account from './account';
import drama from './drama';
import error from './error';

const router = express.Router();
router.use('/account', account);
router.use('/drama', drama);
router.use('/error', error);

export default router;
