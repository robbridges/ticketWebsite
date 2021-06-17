import mongoose from 'mongoose'

// An TS interface that describes the properties that are required to create a new user

interface UserAttributes {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

/* this is a trick we need to use to make mongoose and typescript play nice. It is not not just "new user()" but it requires the typescript interface passed to allow typescript to 
type check the data that we are throwing into it, so that we get the benefits of typescript
*/

const buildUser = (attrs: UserAttributes) => {
  return new User(attrs);
};




export { User, buildUser };