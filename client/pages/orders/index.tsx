import { NextPageContext } from "next";
import axios from "axios";

interface Orders {
  orders: {
    status: string,
    length: number,
    
    ticket: {
      title: string,
    }
  }
  order: string,
  
}

const OrderIndex = ({orders}: Orders) => {
  {if (orders.length == 0)  {
    return <h2>You have no purchased orders</h2>
  }}
  return (
    <ul>
      
      {/* @ts-ignore */}
      {orders.map(order => {
        return (
          <li key = {order.id}>
            {order.ticket.title} - {order.status}
          </li>
        )
      })}
    </ul>
  )
};

export async function getServerSideProps(context: NextPageContext) {
  
const { data } = await axios.get('http://www.ticketing-app-production.com/api/orders/', 
  { headers: context.req!.headers }

);
  
  return {
    props: {
      orders: data
    }
  }
} 

export default OrderIndex;