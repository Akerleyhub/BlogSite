import React from 'react';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Homepage from './Homepage';
import NewPost from './NewPost';
import UpdatePost from './UpdatePost';
import Blog from './Blog';
import {themeChg} from './actionCreators';

import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const commonStyles = {
    borderBottom:"5px solid black",
    textAlign:"center",
    alignItems:"center",
    paddingBottom: "15px",
}

const Router=()=>{
    const dispatch = useDispatch();
    const toggleColorMode =(t)=> {dispatch(themeChg(t));}

    const theme = useSelector(store=>store.theme);
    return (
        <div>
            <BrowserRouter>
                <AppBar sx={{...commonStyles}} position="fixed !important">
                    <Toolbar>
                        <Typography fontFamily="Helvetica, sans-serif">
                            <h1>🔥 Devin's Blog 🔥</h1>
                            <h3>Thoughts/Ideas/Reflections/Rants</h3>
                            <h3>👹👾👻💀🧠👨‍💻🏃🍌</h3>
                            <IconButton sx={{ ml: 1 }} onClick={()=>toggleColorMode(theme)} color="inherit">
                                {theme === true ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            <Link href="/" underline="hover" color="red">
                                {'Home'}
                            </Link>
                            <br/>
                            <Link href="/new" underline="hover" color="red">
                                {'Create new blog or poll'}
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path="/new" >
                        <NewPost />
                    </Route>
                    <Route path="/blog/:blogid">
                        <Blog />
                    </Route>
                    <Route path="/update/:blogid">
                        <UpdatePost />
                    </Route>
                    <Route exact path="/" >
                        <Homepage /> 
                    </Route>
                        <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router;