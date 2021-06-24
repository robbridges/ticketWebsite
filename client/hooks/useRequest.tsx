import axios from 'axios';

import { useState } from 'react';
//this hook should handle our error creation, and also allow us to make axios post requests, this saves us a lot of code duplication in the future

type Props ={
  url: string;
  method: string 
  body: {
    email: string,
    password: string,
  }
}

const UseRequest =  ({url, method, body} : Props) => {
  //const [errors, setErrors] = useState<Error[] | null>([])
  const [errors, setErrors] = useState<Error[] | []>([])

  const doRequest = async () => {
    try {
      // I had to ignore the error below for Axios because we need to do a method look up to see what is being called, as this is going to be a very popular fuction called in a lot of our blocks

      //@ts-ignore
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
      return errors;
    }
  };
  
  return {doRequest, errors};
};

export default UseRequest;