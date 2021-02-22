import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import Home from './Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import NavBar from './Components/Navbar';
import VerifyEmail from './Components/VerifyEmail';
import ForgotPassword from './Components/ForgotPassword';
import UpdatePassword from './Components/UpdatePassword';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    gainHeight: {
      height: '100%',
    },
}));

function App() {
  const classes = useStyles();
  return ( 
    // <Router>
        <div className="App">
            <NavBar/>
            <Grid className="Content" container  direction="row" justify="center" alignItems="center">
                <Router>
                  <Switch>
                    <Route path="/signup"><SignUp/></Route>
                    <Route path="/signin"><SignIn/></Route>
                    <Route path="/verifyEmail"><VerifyEmail/></Route>
                    <Route path="/forgotPassword"><ForgotPassword/></Route>
                    <Route path="/updatePassword"><UpdatePassword/></Route>
                    <Route path="/"><Home/></Route>
                    
                  </Switch>
                </Router>
                {/* <Home/> */}
                {/* <SignUp/> */}
                {/* <SignIn/> */}
            </Grid>
        </div>
          
        // <Grid className = "App" direction="row" justify="center" alignItems="center">
        //     <Grid className="Header" item xs={12}>
        //         <NavBar/>
        //     </Grid>
        //     <Grid className="Content" container item xs={12} direction="column" justify="flex-end" alignItems="flex-end">
        //         <Home/>
        //     </Grid>
        //     {/* <Switch>
        //   <Route exact path="/" component={Home}></Route>
        // </Switch>  */}
        // </Grid> 
        
    
    // </Router>
  );
}

export default App;