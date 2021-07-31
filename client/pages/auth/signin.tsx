import React, {useState} from 'react';
import Router from 'next/router';
import UseRequest from '../../hooks/useRequest';

/*
This is our sign up form, it essentially takes all of the data that we pass into it and makes a request to the api sign up method.

It also conditionally shows our validaiton errors in the event that the password is blank, too short. Long exct. 


*/
const SignUpForm =  () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { doRequest, errors } = UseRequest ({
  url: '/api/users/signin',
  method: 'post',
  body: {
    email,
    password
  },
  onSuccess: () => Router.push('/')
});

  const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    await doRequest();
    
  }; 

  
  return ( 
  <form onSubmit={onSubmit}>
    
    {  errors.length > 0 && (
      <div className="alert alert-danger">
      <h4>Validation error occured</h4>
      <ul className="my-0">
        {errors.map(err => (<li key={err.message}>{err.message}</li>))}
      </ul>
      </div>)
    }
    
    


    <h1>Sign In</h1>
    <div className="form-group">
      <label>Email Address</label>
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        className="form-control" 
      />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        type="password" 
        className="form-control" 
      />
    </div>
    
    <button className="btn btn-primary">Sign In.</button>
  </form>
  );
};

export default SignUpForm;