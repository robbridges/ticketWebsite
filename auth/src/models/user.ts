import mongoose from 'mongoose'
import { Password } from '../services/password';

// An TS interface that describes the properties that are required to create a new user

interface UserAttributes {
  email: string;
  password: string;
}

// an interface that describes the properties that user Model is

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

// An interface that describes the properties that a User Document has this is where we'd add any properties mongoose adds
interface UserDoc extends mongoose.Document {
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

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
/* this is a trick we need to use to make mongoose and typescript play nice. It is not not just "new user()" but it requires the typescript interface passed to allow typescript to 
type check the data that we are throwing into it, so that we get the benefits of typescript
*/


userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


const user = User.build({
  email: 'Whatver',
  password: 'whatever',
});



export { User };