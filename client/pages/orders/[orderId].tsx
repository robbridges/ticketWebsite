import { NextPageContext } from "next";
import axios from "axios";
import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/useRequest'
import Router from 'next/router';


interface Order   {
  status: string,
  userId: string,
  expiresAt: number,
  ticket: {
    title: string,
    price: number,
    version: number,
    id: string,
  },
  version: number,
  id: number
  order?:  {
    expiresAt: number,
    ticket: {
      price: number,
    }
  },
  currentUser:  {
    email: string,
  }
  
}






const OrderShow = ({order, currentUser} : Order) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const {doRequest, errors} = useRequest({
    url: '/api/payments',
    method: 'post',
    body:  {
      //@ts-ignore
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      
      const msLeft : number = new Date(order!.expiresAt).getTime() - new Date().getTime();
      
      setTimeLeft(Math.round(msLeft / 1000))
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  
  
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
   Time left to pay: {timeLeft} seconds
    <StripeCheckout
      token={({id}) => doRequest({token: id})}
      stripeKey="pk_test_51JGEjUDgzyWuVVO06ri5ig78cCyRqaj0PYz17G5J6E5qjYd0mb2Fe1yZX5IqWbIdOjqptLVahJ2bqZb3AUy5YH2F000skq1Gzv"
      amount={order!.ticket.price * 100}
      email={currentUser.email}
      
    />
  </div>
  )
};

export async function getServerSideProps(context: NextPageContext) {
  const { orderId } = context.query;
const { data } = await axios.get(`http://www.ticketing-app-production.com/api/orders/${orderId}`, 
{ headers: context.req!.headers }
);
  
  return {
    props: {
      order: data
    }
  }
} 

export default OrderShow;