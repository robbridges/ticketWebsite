import axios from 'axios';

import { useState } from 'react';
//this hook should handle our error creation, and also allow us to make axios post requests, this saves us a lot of code duplication in the future

// TS action, we are telling typescript what the url and body will be so that it doesn't throw any errors
type Props ={
  url: string;
  method: string 
  body: {
    email?: string,
    password?: string,
  }
  onSuccess: Function
}

const UseRequest =  ({url, method, body, onSuccess} : Props) => {
  const [errors, setErrors] = useState<Error[] | []>([]) // since we conditionally check to see if the error array exists we set it to an empty array first, instead of null then check it's len

  const doRequest = async () => {
    try {
      setErrors([]);
      // I had to ignore the error below for Axios because we need to do a method look up to see what is being called, as this is going to be a very popular fuction called in a lot of our blocks

      //@ts-ignore
      const response = await axios[method](url, body);
      if(onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
      
      return errors;
    }
  };
  
  return {doRequest, errors};
};

export default UseRequest;