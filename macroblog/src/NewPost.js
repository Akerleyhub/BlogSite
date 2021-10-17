import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addBlogsAPI, getBlogsAPI, addPollsAPI} from './actionCreators';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewPost=()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = {
        title:'',
        description:'',
        body:''
    }
    //state for the inputs
    const [formText,setformText] = useState(initialState);
    const [post,setPost] = useState(true); //issue hereeee
    const [pollOption,setPollOption] = useState(new Array(null,null)); //sets it to having two blanks to start


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
        addPost(formText);
        getBlogs();
        history.push('/');
        //sets the form back to empty
        setformText(initialState);
    }

    //on submit of poll, gather useful data in better json format
    const handlePollSubmit=(e)=>{
        e.preventDefault();
        //console.log(formText);
        let data = {};
        let choices = {};
        for (const key of Object.keys(formText)) {
            if(key === 'title'){
                data['title'] = formText[key]
                continue;
            }else if(key === 'body' || key === 'description'){
                continue;
            }
            choices[key] = formText[key];
        }
        data["choices"] = choices;
        console.log(data);
        addPoll(data);
        getBlogs();
        history.push('/');
    }
    
    //dodgy way to get around dispatching needing to be called for the actionCreator
    const addPost=(formObj)=> dispatch(addBlogsAPI(formObj));
    const addPoll=(formObj)=> dispatch(addPollsAPI(formObj));
    const getBlogs=()=>dispatch(getBlogsAPI());

    const addOption=(e)=>{
        //setPollOption(pollOption => [...pollOption,{...newOption,id:id }]);
        e.preventDefault();
        let len = pollOption.length+1;
        let newarr = [];
        for(let x=0;x<len;x++){
            newarr.push(null);
        }
        setPollOption(newarr);
    }
    //might add remove option in the future
    // const remove=(id)=>{
    //     setPollOption(pollOption.filter(x=>x.id!==id))
    // }
    const goHome=()=>{
        history.push('/');
    }
    let counter = 0;
    //Was going to break poll logic into a component but the logic is all very simular, so keeping it together
    return (
        <div style={{textAlign:"center", marginTop:"30px"}}>
            <Button variant="contained" size="medium" onClick={()=>setPost(true)}>
                Blog
            </Button>
            <br/>
            <Button variant="contained" size="medium" onClick={()=>setPost(false)}>
                Poll
            </Button>
            <br/>
            {post ?
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
                :
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    id="form1" 
                    onSubmit = {handlePollSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <h1>New Poll </h1>
                            <TextField 
                                id="filled-basic"  
                                name="title" 
                                label="Poll question" 
                                variant="filled" 
                                value={formText.title} 
                                onChange={handleChange} 
                            />
                            <br />
                            {pollOption.map(poll=> <TextField 
                                                        id="outlined-basic" 
                                                        name={`poll_option${counter=counter+1}`}
                                                        label={`Option${counter}`} 
                                                        variant="outlined" 
                                                        value={poll} 
                                                        onChange={handleChange} 
                                                    />)}
                            <br/>
                            <Button variant="contained" size="medium" onClick={addOption}>
                                Add Another Option
                            </Button>
                            <br/><br/><br/><br/>
                            <Button variant="contained" size="medium" type="submit">
                                Submit
                            </Button>
                            <Button variant="contained" size="medium" onClick={goHome}>
                                Cancel
                            </Button>
                    </div>
                </Box>
                
            }
        </div>
    )
}

export default NewPost;