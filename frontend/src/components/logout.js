import { BACKEND } from '../global';

const handleLogout = () => {
   // Send a request to the server to logout
    fetch(`${BACKEND}/auth/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      // Remove user data from session storage
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('firstName');
      // Redirect to the sign-in page
      window.location = '/signin'; 
      console.log(data)
      console.log('User logout!');
    })
    .catch(error => {
      // Handle any errors that occur during logout
      alert("Error " + error.message);
      console.error(error);
    });
  };

  export default handleLogout;