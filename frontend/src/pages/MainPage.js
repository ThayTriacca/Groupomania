import React, { Component} from "react";
import { BACKEND } from "../global";
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import PostCard from '../components/PostCard';

import '../styles/App.css';


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loaded: false
        };
    }

    componentDidMount() {
        //Fetching data from API
        fetch(`${BACKEND}/post`)
            .then((res) => res.json())
            .then((data) => {
                //Updating state with fetched data
                this.setState({ loaded: true, posts: data });
            })
            .catch((error) => { });
    }


    render() {
        const {posts, loaded} = this.state;
        return (
            <div className="App">
                <ResponsiveAppBar />
                <div className='Body'>
                {loaded && posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard post={post} key={post.id} />
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </div>
        );
    }
};

export default MainPage;