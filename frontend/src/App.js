import './styles/App.css';
import DrawerAppBar from './components/ResponsiveAppBar';
import PostCard from './components/PostCard';
import InstagramPost from './components/InstagramPost';


function App() {

  return (
    <div className="App">
      <DrawerAppBar/>
      <div className='Body'>
      <PostCard/>
      <InstagramPost/>
      </div>
    </div>
  );
}

export default App;
