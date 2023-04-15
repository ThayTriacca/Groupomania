import ResponsiveAppBar from '../components/ResponsiveAppBar'
import PostCard from '../components/PostCard';

import '../styles/App.css';


export default function MainPage() {
    return (
    <div className="App">
        <ResponsiveAppBar />
        <div className='Body'>
            <PostCard />

        </div>
    </div>
    )
};
