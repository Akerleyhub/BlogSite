import './App.css';
import Router from './Router';
import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from "react-redux";
//https://mui.com/customization/default-theme/#main-content
const regTheme = createTheme({
  palette: {
    primary: {
      main: '#76323F',
    },
    secondary: {
      main: '#C09F80',
    },
    background: {
      paper: '#D7CEC7',
    },
    text: {
      primary: '#565656',
    }
  },
  typography: {
    h1: {
      fontFamily: "Tahoma, sans-serif"
    },
    button: {
      fontFamily: "Tahoma, sans-serif"
    }
  }
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#575267"
    },
    background: {
      paper: '#8d8980',
    },
    text: {
      primary:"#09d3ac"
    }
  },
  typography: {
    h1: {
      color: "#a0ffe3",
      fontFamily: "Tahoma, sans-serif"
    },
    button: {
      fontFamily: "Tahoma, sans-serif"
    }
  }
})
//green colors I should of made text headers in dark mode
//https://stackoverflow.com/questions/58284974/change-default-text-color-material-ui
//"#26a27b" "#65dc98" "#a0ffe3" >"#09d3ac"

function App() {
  const theme = useSelector(store=>store.theme);
  return (
    <ThemeProvider theme ={theme ? regTheme:darkTheme} >
      <div className="App">
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
