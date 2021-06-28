import axios from 'axios';
import { NextPageContext } from 'next';




type Props = {
  props: {
    currentUser: {
      id: string,
      email: string,
      iat: number
    }
  }
}
// this is our landing page, it is going to try to get props passed in if a current user is signed in. So that we can then conditionally different objects

const LandingPage = ({ props }: Props) => {
  
  return props.currentUser? <h1>Hello </h1> : <h1>Good Bye</h1>
};



export async function getServerSideProps({ req }: NextPageContext) {
  const {data} = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
    { headers: req!.headers }
  );
  console.log('landing page!')
  return {
    props: {
      props: data
    }
  }
} 





export default LandingPage; 