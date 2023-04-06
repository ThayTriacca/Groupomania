import './styles/App.css';
import SignIn from './components/SignIn';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';



function App() {

  return (
    <Router>
    <div className="App">
      {/* <SignIn/> */}
      <SignUp/>
      {/* <MainPage/> */}
    </div>
    </Router>
  );
}

export default App;
