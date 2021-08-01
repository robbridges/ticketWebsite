import axios from 'axios';
import { NextPageContext } from 'next';

/*
this is our axios builder, we are return specific urls  to axios and pass in headers
we then can write this off to do a check on if the request is on the server
or with our users browser. Hence the absence if window
Much easier than writing this multiple times. 
*/
const BuildClient = ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:'http://ticketing-app-production.com/',
      headers: req!.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default BuildClient;
