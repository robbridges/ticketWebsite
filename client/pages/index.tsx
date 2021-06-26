import axios from 'axios';
import {  NextPageContext } from 'next';


interface serverResponse  {
  data?: currentUser
  req: Request
}



interface currentUser  {
  id: string,
  email: string,
  iat: number

}

type Props = {
  currentUser :currentUser
}
// this is our landing page, it is going to try to get props passed in if a current user is signed in. So that we can then conditionally different objects
const LandingPage = ({ currentUser } : Props) => {
  console.log(currentUser);
  
 
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ( {req} : NextPageContext ) => {
  // we have to do some weird type checking here to try to determine if the request is being handled internally by next Js, which will not because it needs to reach out to NGINX, or the browser
  
  if (typeof window === 'undefined') {
    
    try {
      if (req) {
        const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
          {   
              
              headers: req.headers
          }
        );

        return data;
      }
    } catch(err) {
      console.log(err.message);
    }
    
    // return response.data;

  } else {
    // we are on browser requests can be made to regular url
    try {
      const response = await axios.get('/api/users/currentuser');
      return response.data;
    } catch(err) {
      console.log(err.message);
    }

    
    
  }
  return {};

};

export default LandingPage;