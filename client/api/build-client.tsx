import axios from 'axios';
import { NextPageContext } from 'next';

const BuildClient = async ({req} : NextPageContext) => {
  if (typeof window === 'undefined') {
    if (req) {
      return axios.create({
          baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
          headers: req.headers
      });
    } 
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
};

export default BuildClient;

