import express from 'express';
const router = express.Router();
import redirectToLongUrl from '../controllers/url-shortener';

/* GET short url. */

router.get('/:urlcode', redirectToLongUrl);


export default router;
