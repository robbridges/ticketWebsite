import express, {Request, Response} from 'express';
import { body  } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
/* Sign in route, all that this really does is check the database for a matching email address, and checking to see if our hashed/salted PW matches what was provided during the
login in attempt. If either fail we return an unhelpful Credentials do not match. We do not want a malicious user to know if their password or email was invalid */

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
],
validateRequest,  

async (req: Request, res: Response) => {
  const {email, password} = req.body; 

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(
    existingUser.password, 
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

   // create a JWT, and store it in the session
   const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_TOKEN!
  );

  // we have to store it as an object because typescript does not like the type definition
  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser)

}
);

export { router as signinRouter };