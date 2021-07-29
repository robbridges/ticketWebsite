import { NextPageContext } from "next";
import axios from "axios";

interface Orders {
  orders: {
    status: string,
    
    ticket: {
      title: string,
    }
  }
  order: string,
  
}

const OrderIndex = ({orders}: Orders) => {
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
  
const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orders/', 
  { headers: context.req!.headers }

);
  
  return {
    props: {
      orders: data
    }
  }
} 

export default OrderIndex;