import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getCommentsAPI,addCommentsAPI,delCommentsAPI} from './actionCreators';

const Comment=({blogid})=>{
    const dispatch = useDispatch();
    const comments = useSelector(store=>store.comments);

    const newComment=(blogid, commentObj)=> dispatch(addCommentsAPI(blogid,commentObj));
    const deleteComment=(blogid,id)=> dispatch(delCommentsAPI(blogid,id));

    useEffect(() => {
        dispatch(getCommentsAPI(blogid));
      }, [dispatch]);

    const initialState = {
        comment:''
    }
    //state for the inputs
    const [formText,setformText] = useState(initialState);

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
        newComment(blogid, formText.comment);
        //newComment(formText);
        //sets the form back to empty
        setformText(initialState);
    }

    const click=(e)=>{
        e.preventDefault();
        let id = e.target.id;
        deleteComment(blogid,id);
        //deletec(e.target.id);
    }

    return (
        <div>
            {console.log(comments)}
            <h5>Comments</h5>
            {comments.map(newc=> <div><p>{newc.text}</p><button id={newc.id} onClick={click}>X</button></div>)}

            <form id="form1" onSubmit = {handleSubmit}>
                <label htmlFor="comment">Comment</label>
                <input type="text" 
                    placeholder="Comment on blog" 
                    name="comment"
                    value={formText.comment}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default Comment;