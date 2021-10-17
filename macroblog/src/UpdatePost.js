import React,{useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getBlogsAPI, updateBlogsAPI} from './actionCreators';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdatePost=()=>{
    const {blogid} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    //const updateInfo=(blogid)=> dispatch(getBlogAPI(blogid));
    //don't need to dispatch because you can/should only get to that link through Blog that will already update the dispatch
    const updateInfo = useSelector(store=>store.blogData);

    const initialState = {
        title:updateInfo.title,
        description:updateInfo.description,
        body:updateInfo.body
    }
    //state for the inputs
    const [formText,setformText] = useState(initialState);
    const [post,setPost] = useState(true); //issue hereeee

    //changes the state of inputs for each typed character
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformText(formText => ({
            ...formText,
            [name]:value
        }))
    }

    //on submittion sent to parent to create the box
    const handleSubmit=(e)=>{
        e.preventDefault();
        upPost(formText);
        getBlogs();
        history.push('/');
        setformText(initialState);
    }
    

    const upPost=(formObj)=> dispatch(updateBlogsAPI(blogid, formObj));
    const getBlogs=()=>dispatch(getBlogsAPI());

    const goHome=()=>{
        history.push('/');
    }

    return (
        <div style={{textAlign:"center", marginTop:"30px"}}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '70ch' },
                }}
                id="form1" 
                onSubmit = {handleSubmit}
                noValidate
                autoComplete="off"
            >
                <div>
                    <h1>New Post </h1>
                    <TextField 
                        id="filled-basic"  
                        name="title" 
                        label="Title" 
                        variant="filled" 
                        value={formText.title} 
                        onChange={handleChange} 
                    />
                    <br />

                    <TextField 
                        id="outlined-basic" 
                        name="description" 
                        label="Description" 
                        variant="outlined" 
                        value={formText.description} 
                        onChange={handleChange} 
                    />
                    <br />

                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Add text"
                        label="Body"
                        multiline
                        rows={13}
                        name="body"
                        value={formText.body}
                        onChange={handleChange}
                        />
                    <br />
                    <Button variant="contained" size="medium" type="submit">
                        Submit
                    </Button>
                    <Button variant="contained" size="medium" onClick={goHome}>
                        Cancel
                    </Button>
                </div>
            </Box>
        </div>
    )
}

export default UpdatePost;