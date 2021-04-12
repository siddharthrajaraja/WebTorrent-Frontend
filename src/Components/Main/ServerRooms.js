import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { useCookies ,Cookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import {nodehost} from '../../env';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function ServerRooms() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [serverData, setServerData] = React.useState('')


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [cookies, setCookie, removeCookie] = useCookies(['Web_Torrent_Token']);
    const {Web_Torrent_Token}=cookies;
    const token=Web_Torrent_Token;

    const decode = jwt_decode(token);
    
    console.log("My tolen :",decode.emailID);

    function getAllRooms(){
      const url = nodehost+"/api/getAllRooms?emailID="+decode.emailID;
      console.log("api url: ", url);
      
      const userObj = {
        roomName: 'masti hai mizaz me '
      }
  
      const axiosConfig={
        withCredentials:true
      }
  
      axios.get(url,axiosConfig)
      .then(response => {
        setServerData(response.data);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  
    }

  function CreateRoom(){
    const url = nodehost+"/api/createRoom?creatorID="+decode.emailID;
    console.log("api url: ", url);

    
    const userObj = {
      roomName: 'masti hai mizaz me '
    }

    const axiosConfig={
      withCredentials:true
    }

    axios.post(url,userObj,axiosConfig)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userObj)
    // };

    // fetch(url, requestOptions)
    // .then( (response) => {
    //   console.log("Displaying Response",response,response.status);
    // })
    // .then(data => console.log("fetch data: ",data))
    // .catch(error => console.log("fetch error: ",error));

    // axios.post(url, {
    //   creatorID: 'shrivastavaman171@gmail.com'
    // })
    // .then((response) => {
    //   console.log(response);
    // }, (error) => {
    //   console.log("Crate Error:" ,error);
    // });
  }

  return (
      <div>
        <br/>
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" className={classes.orange}>
                        A
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="UserName" />
            </ListItem>
        </List>

        <Typography> Backup Servers </Typography>
              {/* { getAllRooms() */}
                
              
         
        <List className={classes.root}>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" className={classes.orange}>
                        A
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Backup Server A" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" className={classes.orange}>
                        B
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Backup Server B" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" className={classes.orange}>
                        C
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Backup Server C" secondary="July 20, 2014" />
            </ListItem>
        </List>
        <br/>
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add New Server
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Spring modal</h2>
            <p id="spring-modal-description">react-spring animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
