
const INITIAL_STATE = { comments: [], blogPosts:[], blogData:{}, voteCount:{}, theme: true };

function rootReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case 'ADD_BLOG':
            console.log(action.formObj);
            return { ...state,
                blogPosts: [...state.blogPosts,{...action.formObj}]
                }
            //return [...state.blogPosts,{...action.formObj,id:uuid() }]
            
        case 'UPDATE_BLOG':
            //console.log(action.data)
            for(let x of state.blogPosts){
                if(x.id === action.data.id){
                    return {...state, blogData:{id:x.id, title:x.title, description:x.description, body:x.body}};
                }
            }

        case 'DELETE_BLOG':
            console.log(action)
            return { ...state,
                blogPosts: state.blogPosts.filter(x=>x.id!==action.id)
                }
        //gets all the blogs for the homepage
        case 'GET_BLOGS':
            return { ...state, blogPosts: action.data }
        //blog data for a single blog
        case 'GET_BLOG':
            return { ...state, blogData: action.data }

        case 'BLOG_DATA':
            for(let x of state.blogPosts){
                if(x.id === action.blogid){
                    console.log('triggered');
                    return {...state, blogData:{id:x.id, title:x.title, description:x.description, body:x.body}};
                }
            }

        case 'GET_COMMENT':
            //console.log(state.comments);
            return { ...state, comments: action.data }

        case 'ADD_COMMENT':
            //console.log(action.data);
            return { ...state,
                comments: [...state.comments,{...action.data}]
                }

        case 'DELETE_COMMENT':
            return { ...state,
                comments: state.comments.filter(x=>x.id!==action.data)
                }
        case 'VOTE_BLOG':
            // return {...state,
            //     voteCount: action.data.votes}
            //let p = state[action.id];
            //console.log(p, action.id)
            //console.log(state.voteCount)
            return {
                ...state,
                voteCount: { ...state.voteCount, [action.id]:action.votes }
            };

        case 'CHANGE_THEME':
            return {
                ...state,
                theme: !action.data
            }

        case 'DO_NOTHING':
            return {}

        default:
            return state;
    }
}

export default rootReducer;