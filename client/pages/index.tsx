import axios from 'axios';
import { NextPageContext } from 'next';


interface currentUser  {
  id: string,
  email: string,
  iat: number

}

type Props = {
  currentUser :currentUser
}
// this is our landing page, it is going to try to get props passed in if a current user is signed in. So that we can then conditionally different objects

const LandingPage = ({ currentUser }: Props) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};



export async function getServerSideProps({ req }: NextPageContext) {
  const response = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', { headers: req!.headers });
  return {
    props: {
      currentUser: response.data,
    }
  }
} 





export default LandingPage; 