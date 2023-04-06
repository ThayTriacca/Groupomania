import ResponsiveAppBar from './ResponsiveAppBar'
import PostCard from './PostCard';
import InstagramPost from './InstagramPost';
import '../styles/App.css';


export default function MainPage() {
    return (
    <div className="App">
        <ResponsiveAppBar />
        <div className='Body'>
            <PostCard />
            <InstagramPost />
        </div>
    </div>
    )
};
