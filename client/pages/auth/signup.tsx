import React, {useState} from 'react';
import Router from 'next/router';
import UseRequest from '../../hooks/useRequest';


const SignUpForm =  () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { doRequest, errors } = UseRequest ({
  url: '/api/users/signup',
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
    
    


    <h1>Sign Up</h1>
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
    
    <button className="btn btn-primary">Sign Up.</button>
  </form>
  );
};

export default SignUpForm;