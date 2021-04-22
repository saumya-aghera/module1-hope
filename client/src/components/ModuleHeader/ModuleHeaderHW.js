import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Navbar, Nav} from 'react-bootstrap';
//import { Link} from "react-scroll";

import { Avatar, Button} from '@material-ui/core';
import { refreshTokenSetup } from '../../utils/refreshToken';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideMenu from '../Menu/SideMenu';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  
  menuButton: {
    marginRight: theme.spacing(-2),
  },
  
}));

const clientId =
  '23157659159-k7of2mgt1a7ipa1hbpjqt7nnajf44d72.apps.googleusercontent.com';


const ModuleHeaderHW = ({ loggedIn, onLogin, user, setUser,
 menu,
  updatedModuleStatus, changeUpdatedModuleStatus }) => {

  //const [userLoggedBefore, setUserLoggedBefore] = useState();
  
    function addNewUser( newEmail,newUserStatus ){
    console.log('Not registered before',newUserStatus)
     axios.post('http://localhost:5000/users/add', newUserStatus);
      changeUpdatedModuleStatus(prevState => ({
        ...prevState,
        userId:newEmail
      }))
      console.log('posted user in back')
  };

  const updateProgress = async (newEmail) => {
  console.log('Already registered before');

  try {
    const response = await axios.get('http://localhost:5000/users/updatedInfo', {
      params: {
        userId: newEmail
      }
    });
    changeUpdatedModuleStatus(response.data)
    console.log('finalcheck',updatedModuleStatus)
  }catch (err) {
        // Handle Error Here
        console.error(err);
    }
      
  }

  const checkForNewUser = async (newEmail,newUserStatus) => {
    console.log('function called')
    try {
        const resp = await axios.get('http://localhost:5000/users/newold', {
      params: {
        userId: newEmail
      }
    });
      console.log('resp', resp.data);
     
    //If new user then register the user in db
    if (!resp.data) {
      addNewUser(newEmail,newUserStatus)
    }
    // else bring the user till now progress from back
    else {
      updateProgress(newEmail); 
    }
    

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

 

  const onSuccess = (res) => {
    onLogin(true);


    setUser({
      email: res.profileObj.email,
      familyName: res.profileObj.familyName,
      givenName: res.profileObj.givenName,
      googleId: res.profileObj.googleId,
      imageUrl: res.profileObj.imageUrl,
      name: res.profileObj.name
    });

    const newUserStatus = {
      userId:res.profileObj.email,
      module1_completed: false,
      module2_completed: false,
      module3_completed: false,
      module4_completed: false,
      module5_completed: false,
      module6_completed: false,
       worksheet1: false,
        hopeBox1: false,
      homeAssignment1: false,
        
      mindfulness2: false,
      
      try3: false,
      homeAssignment3: false,
      
      thankful4: false,
      letter4: false,
       homeAssignment4:false,
      hw4_day1: false,
      hw4_day2: false,
      hw4_day3: false,
      hw4_day4: false,
      hw4_day5: false,
      hw4_day6: false,
      hw4_day7: false,
      
      survey5: false,
      strength5: false,
      homeAssignment5: false,
      
      activity6: false,
      feedback6:false
    }

    
    //for checking if user is new to website
    checkForNewUser(res.profileObj.email,newUserStatus)
    
    refreshTokenSetup(res);
  };

    const onFailure = (res) => {
        console.log('Login failed:', res);
        alert('Google Sign In was unsuccessful. Try again later');
  };
  
  const logout = () => {
    onLogin(false);
    console.log('logout',user)  
    };

  
    const popUp = () => {
        console.log('inside function')
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    };

    return (
    
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
           
            <Navbar.Brand >
          <SideMenu menu={menu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  />
          </Navbar.Brand>
                <Navbar.Brand style={{marginLeft:'30px'}} href="/">HAPPETITE</Navbar.Brand>
                
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        {loggedIn ? (<Nav>
          <Nav.Link style={{ paddingTop: '18px' }}>
            <GoogleLogout
              clientId={clientId}
              render={renderProps => (
                  <Button variant="contained" color="grey" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Logout
                  </Button>)}
        buttonText="Logout"
        onLogoutSuccess={logout}
            />
          </Nav.Link>
          <Nav.Link >
            <div className="popup" onClick={popUp} style={{ textAlign: 'center',paddingTop: '10px' }}>
              <Avatar alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}
                 </Avatar>
              <p class="popuptext" id="myPopup">
                Signed in as {user.name}
              </p>
                </div>
           
                
            </Nav.Link>
        </Nav>) : (<Nav>
            <Nav.Link style={{ paddingTop: '15px' }}>
          <GoogleLogin
            clientId={clientId}
              render={renderProps => (
                  <Button variant="contained" color="grey" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Sign In
                  </Button>)}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
                isSignedIn={true}
                
              />
              </Nav.Link>
      </Nav>  )}
            
       
      </Navbar.Collapse>
    </Navbar>
        

    
  );
}

export default ModuleHeaderHW;