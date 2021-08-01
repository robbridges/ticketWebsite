import { NextPageContext } from "next";
import axios from 'axios';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';


interface Props {
  ticket : {
    title: string,
    price: number,
    userId: string,
    version: number,
    id: string,
  }
}

interface Order {
  id: string,
  email: string,
  iat: number,
}

const TicketShow = ({ticket} : Props) => {
  const {doRequest, errors} = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      //@ts-ignore
      ticketId: ticket.id,
    },
    onSuccess: (order : Order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <div>
      {  errors.length > 0 && (
      <div className="alert alert-danger">
      <h4>Validation error occured</h4>
      <ul className="my-0">
        {errors.map(err => (<li key={err.message}>{err.message}</li>))}
      </ul>
      </div>)
      }
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      <button onClick={(event) =>doRequest()} className= "btn btn-primary">Purchase</button>
    </div>
  )
};

export async function getServerSideProps(context: NextPageContext) {
  const { ticketId } = context.query;
const { data } = await axios.get(`http://www.ticketing-app-production.com/api/tickets/${ticketId}`, 
{ headers: context.req!.headers }
);
  //console.log({data})
  return {
    props: {
      ticket: data
    }
  }
} 

export default TicketShow;