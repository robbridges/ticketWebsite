import axios from 'axios';
import { NextPageContext } from 'next';
import Link from 'next/link';




type Props = {
  currentUser: {
      id: string,
      email: string,
      iat: number
  },
  tickets: {
    title: string,
    price: number,
    userId: string,
    version: number,
    id: string,
  }
  
}
// this is our landing page, it is going to try to get props passed in if a current user is signed in. So that we can then conditionally different objects

const LandingPage = ({ tickets } : Props) => {
  //@ts-ignore
  const ticketList = tickets.map(ticket => {
    return (
      <tr key = {ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  })
  // return currentUser? <h1>Hello </h1> : <h1>Good Bye</h1>
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div> 
  
  )
  
};


export async function getServerSideProps({ req }: NextPageContext) {
  const {data} = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/tickets/', 
    { headers: req!.headers }
  );
  
  console.log({data});
  return {
    props: {
      tickets: data
    }
  }
} 





export default LandingPage; 