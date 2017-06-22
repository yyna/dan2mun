import express from 'express';
import account from './account';
import drama from './drama';

const router = express.Router();
router.use('/account', account);
router.use('/drama', drama);

export default router;
