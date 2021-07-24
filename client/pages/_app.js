import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from '../api/build-client';
import Header from '../components/Header';


const AppComponent = ({ Component, pageProps, currentUser}) => {
  return <div>
    <Header currentUser={currentUser} />
    <div className="container">
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  </div> 
};
 
/* getServerSideProps does not work in _app.js what a sham, used old soon
to be depreciated method
*/

AppComponent.getInitialProps = async (appContext) => {
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('api/users/currentuser');
  console.log('App page!');
  console.log(data.currentUser);
  
  return {
    currentUser: data.currentUser
  }
}

export default AppComponent;