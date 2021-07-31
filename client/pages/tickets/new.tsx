import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const {doRequest, errors} = useRequest({
    url:'/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await doRequest();
  }

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  }
 
  return (
    

    <div>
      <h1>Create a ticket</h1>
      <form onSubmit={onSubmit}>
        {  errors.length > 0 && (
          <div className="alert alert-danger">
          <h4>Validation error occured</h4>
          <ul className="my-0">
            {errors.map(err => (<li key={err.message}>{err.message}</li>))}
          </ul>
          </div>)
        }

        <div className="form-group">
          <label>Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
          value={price}
          onBlur={onBlur} 
          onChange={e => setPrice(e.target.value)} 
          className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>  
      </form>
      
      
    </div>
  )
};

export default NewTicket;