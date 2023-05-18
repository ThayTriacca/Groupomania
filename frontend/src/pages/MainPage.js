import React, { Component} from "react";
import { BACKEND } from "../global";
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import PostCard from '../components/PostCard';
import Grid from '@mui/material/Unstable_Grid2';
import '../styles/App.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
                <div className='Main-Container'>
                {loaded && posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard post={post} key={post.id} />
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
                {/* <div className='Main-Container'>
                    {loaded && posts.length > 0 ? (
                        <Box xs={{flexGrow:1}}>
                        <Grid container spacing={{xs:2,md:3}} columns={{xs:4,sm:8,md:12}}>  
                           { posts.map((post) => (
                                <Grid xs={2} sm={4} key={post.id}>
                                   <Item><PostCard post={post} key={post.id} /></Item> 
                                </Grid>
                            ))}
                        </Grid> </Box> )
                        
                        : (
                            <p>No posts found.</p>
                        )}


                </div> */}
            </div>
        );
    }
};

export default MainPage;