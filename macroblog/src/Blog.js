import React,{useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Comment from './Comment';
import { useSelector, useDispatch } from "react-redux";
import { getBlogAPI,getBlogsAPI,deleteBlogsAPI, upodownBlogsAPI } from './actionCreators';

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '90rem',
    height: '70rem',
    borderRadius: '16px',
    padding:"15px",
    textAlign:"center",
    margin:"auto",
    marginTop:"15px",
    display:"block"
};

const Blog=()=>{
    const {blogid} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const blogData = useSelector(store=>store.blogData);
    const voteCount = useSelector(store=>store.voteCount);

    const delBlog=(id)=> dispatch(deleteBlogsAPI(id));
    const vote=(id,dir)=> dispatch(upodownBlogsAPI(id,dir));
    const getBlogs=()=>dispatch(getBlogsAPI());

    function deleteRedirect(blogid)
    {
        //call on the backend to delete and then redirect to the home page
        delBlog(blogid);
        //update because sometimes it wont call getBlogs and just send you to page
        getBlogs();
        history.push('/');
    }

    useEffect(() => {
        dispatch(getBlogAPI(blogid));
      }, [dispatch]);
    
    // const addData=(blogid)=>{
    //     dispatch({type:'BLOG_DATA', blogid});
    // }
    // addData(blogid);

    return (
        <Box sx={{ ...commonStyles }}>
            <div style={{textAlign:"center"}}>
                <h2>{blogData.title}</h2><br />
                <h4>{blogData.description}</h4> <br />
                <p>{blogData.body}</p> <br />
                <IconButton sx={{ ml: 1 }} onClick={()=>history.push(`/update/${blogid}`)} color="inherit">
                    <EditIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ ml: 1 }} onClick={()=>deleteRedirect(blogid)} color="inherit">
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <IconButton sx={{ ml: 1 }} onClick={()=>vote(blogid,'up')} color="inherit">
                    <ThumbUpIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ ml: 1 }} onClick={()=>vote(blogid,'down')} color="inherit">
                    <ThumbDownIcon fontSize="small" />
                </IconButton>
                <p>The vote count is {voteCount[blogid]}</p>

                <Comment blogid={blogid} />
            </div>
        </Box>
    )
}

export default Blog;