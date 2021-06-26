import { useEffect } from 'react';
import  Router  from 'next/router';

import UseRequest from '../../hooks/useRequest';

/* our signout fuction it reaches out to the API to remove the cookie
and kicks the user back to the main route 
*/

const SignOut = () => {
  const {doRequest} = UseRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });
  /* since we are dealing with cookies, we do not want our server to handle
  we instead use an use effect hook to make sure that request is made in the component, an handled
  by the users browser
  */

  useEffect(() => {
    doRequest();
  }, [])

  return<div>Signing you out</div>
};

export default SignOut;