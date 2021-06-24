import axios from 'axios';
import { string } from 'prop-types';

type Props = {
  currentUser: {
    id: string,
    email: string,
    iat: number
  }
}
// this is our landing page, it is going to try to get props passed in if a current user is signed in. So that we can then conditionally different objects
const LandingPage = ({ currentUser } : Props) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
 
  return <h1>Landing Page</h1>;
};

// LandingPage.getInitialProps = async () => {
//   const response = await axios.get('api,users/currentuser');
  
//   return response.data;
// };

export default LandingPage;