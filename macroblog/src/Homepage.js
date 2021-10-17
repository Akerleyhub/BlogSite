import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getBlogsAPI} from './actionCreators';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '45rem',
    height: '10rem',
    borderRadius: '16px',
    padding:"15px",
    textAlign:"center",
    display:"block"
};
// margin:"auto", works better than padding but effects the background color :/

const Home=()=>{
    const history = useHistory();
    const blogs = useSelector(store=>store.blogPosts);
    const theme = useSelector(store=>store.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogsAPI());
      }, [dispatch]);
    
    let bg = theme? '#C09F80':'#222035';
    return (
        <div style = {{textAlign:"center", paddingTop:"30px", paddingLeft:"30%", backgroundColor:bg}}>
            {blogs.map(x=> 
                <Box sx={{ ...commonStyles }}>
                    <Button variant="contained" size="medium" onClick={()=>history.push(`/blog/${x.id}`)}>
                        {x.title}
                    </Button>
                    <p>{x.description}</p>    
                    <p>Current votes: {x.votes}</p>           
                </Box>
                )}
        </div>
    )
}

export default Home;