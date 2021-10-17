import axios from 'axios';
import {useHistory} from 'react-router-dom';

//for getting blogs
export function getBlogsAPI(){
    return async function(dispatch) {
        let res = await axios.get('http://localhost:5000/api/posts');
        dispatch(gotBlogs(res.data))
    }
}

//for getting 1 blog
export function getBlogAPI(id){
    return async function(dispatch) {
        let res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch(gotBlog(res.data))
    }
}

//for adding blogs
export function addBlogsAPI(data){
    return async function(dispatch) {
        console.log('data:',data);
        let res = await axios.post('http://localhost:5000/api/posts',data);
        dispatch(plusBlogs(res.data))
    }
}

//for deleting blogs
export function deleteBlogsAPI(id){
    return async function(dispatch) {
        let res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
        dispatch(delBlogs(id))
    }
}

//for updating blogs
export function updateBlogsAPI(id, data){
    return async function(dispatch) {
        let res = await axios.put(`http://localhost:5000/api/posts/${id}`, data);
        dispatch(updBlogs(res.data))
    }
}

//for voting blogs
export function upodownBlogsAPI(id,direction){
    return async function(dispatch) {
        let res = await axios.post(`http://localhost:5000/api/posts/${id}/vote/${direction}`);
        console.log(res.data);
        dispatch(voteBlogs(id,res.data))
    }
}

//------------------Comments--------------------

export function getCommentsAPI(post_id){
    return async function(dispatch) {
        let res = await axios.get(`http://localhost:5000/api/posts/${post_id}/comments`);
        dispatch(gotComments(res.data))
    }
}

export function addCommentsAPI(post_id, text){
    return async function(dispatch) {
        let res = await axios.post(`http://localhost:5000/api/posts/${post_id}/comments`, {text:text});
        console.log(res);
        dispatch(addedComments(res.data))
    }
}

export function delCommentsAPI(post_id, cid){
    return async function(dispatch) {
        let res = await axios.delete(`http://localhost:5000/api/posts/${post_id}/comments/${cid}`);
        console.log(res.data);
        dispatch(deletedComments(cid))
    }
}

//--------------------Polls---------------------Not continuing with it, dispatches arent made but was the last part----------------------------------------
export function getPollsAPI(){
    return async function(dispatch) {
        let res = await axios.get('http://localhost:5000/api/polls');
        //dispatch(gotPolls(res.data))
    }
}

//for adding Polls
export function addPollsAPI(data){
    return async function(dispatch) {
        console.log('data:',data);
        let res = await axios.post('http://localhost:5000/api/polls',data);
        dispatch(plusPolls(res.data))
        //dispatch(plusPolls(res.data))
    }
}

//for deleting Polls
export function deletePollsAPI(id){
    return async function(dispatch) {
        let res = await axios.delete(`http://localhost:5000/api/polls/${id}`);
        //dispatch(delPolls(id))
    }
}

//--------------------Functions tobe called to dispatch--------------------------------------

export function gotBlogs(data){
    return {
        type: 'GET_BLOGS',
        data
    }
}

export function gotBlog(data){
    return {
        type: 'GET_BLOG',
        data
    }
}

export function plusBlogs(data){
    return {
        type: 'ADD_BLOG',
        data
    }
}

export function delBlogs(data){
    return {
        type: 'DELETE_BLOG',
        data
    }
}

export function updBlogs(data){
    return {
        type: 'UPDATE_BLOG',
        data
    }
}

export function voteBlogs(id, data){
    return {
        type: 'VOTE_BLOG',
        id:id,
        votes:data.votes
    }
}

export function gotComments(data){
    return {
        type: 'GET_COMMENT',
        data
    }
}

export function addedComments(data){
    console.log(data);
    return {
        type: 'ADD_COMMENT',
        data
    }
}

export function deletedComments(data){
    return {
        type: 'DELETE_COMMENT',
        data
    }
}

export function themeChg(data){
    return {
        type: 'CHANGE_THEME',
        data
    }
}

export function plusPolls(data){
    return {
        type: 'DO_NOTHING',
        data
    }
}