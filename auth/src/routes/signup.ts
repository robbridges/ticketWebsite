import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import  jwt  from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';


const router = express.Router();

/* below is validation code using express validator, instead of having to hand key manual validation checks we can have this library do it, and tell us if 
the user name or password is not up the restrictions we put in place. Just boiler plate for DB not yet wired up to create a real user, but POSTMAN confirms this is working
*/
router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
 async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ email, password });
  await user.save();

  // create a JWT, and store it in the session
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_TOKEN!
  );

  // we have to store it as an object because typescript does not like the type definition
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);

});

export { router as signupRouter };