import { BACKEND } from '../global';

const handleLogout = () => {
    fetch(`${BACKEND}/auth/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('firstName');
      window.location = '/signin'; 
      console.log(data)
      console.log('User logout!');
    })
    .catch(error => {
      alert("Error " + error.message);
      console.error(error);
    });
  };

  export default handleLogout;