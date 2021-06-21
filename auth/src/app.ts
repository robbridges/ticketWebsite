import express from 'express';
import 'express-async-errors'

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';



/* While it may seem crazy to not sign or encrypt our cookie, there is actually a reason for it. We are only using the cookie to transport a JWT. Which can't be tampered with,
    So a malicious user can read all the data that he wants, changing it invalidates the token. Why this change? In the event one of our services ever gets written in another language
    an encrypting cookie would cause nothing but problems
*/

const app = express();
// we use NGINX so express should trust our proxy
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req,res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };