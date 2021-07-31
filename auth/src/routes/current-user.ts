import express from 'express';

import { currentUser } from '@ticket.dev/common';


const router = express.Router();
// We are checking to see if the user is signed in (if they have a valid JWT that has not been modified) We are benching typescript because before we even connect to the database we are making sure that 
// it exists, so telling typescript to sit this one out seems fine.
router.get('/api/users/currentuser', currentUser,  (req,res) => {
  
  // we want to catch any error that verify might throw, this is how we know that our token has not been modified
  res.send({ currentUser: req.currentUser || null });


});

export { router as currentUserRouter};