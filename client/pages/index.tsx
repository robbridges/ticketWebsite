import axios, { AxiosResponse } from 'axios';

interface serverResponse  {
  data: currentUser
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

LandingPage.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    // we are on server, make request to nginx
  } else {
    // we are on browser requests can be made to regular url
    
    const response : any  = await axios.get<currentUser>('/api/users/currentuser').catch((err) => {
      console.log(err.message);
    });
    return response.data;
    
  }
  return {};

};

export default LandingPage;