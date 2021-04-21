import React, { useState,useEffect } from 'react'
import './Grat.css'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { refreshTokenSetup } from '../../utils/refreshToken';
import { Modal, Button } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import {useLocation } from 'react-router-dom';
const clientId =
  '23157659159-k7of2mgt1a7ipa1hbpjqt7nnajf44d72.apps.googleusercontent.com';



function Grat({ loggedIn, onLogin, user, setUser,
  updatedModuleStatus, changeUpdatedModuleStatus }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

 useEffect(() => {
   
    changeUpdate();
    
    }, [updatedModuleStatus.thankful4])
    

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
        homeAssignment1:false,
  
      minfulness2: false,
      
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
      handleClose();
  };


    
    const changeUpdate = () => {
     

    console.log('change hua ki nahi', updatedModuleStatus)
    
    if (updatedModuleStatus.thankful4 && updatedModuleStatus.letter4 && updatedModuleStatus.homeAssignment4) {
     changeUpdatedModuleStatus(prevState => ({
      ...prevState,
      module4_completed:true
    }));
    }
    
    const { userId,
        module1_completed,
        module2_completed,
        module3_completed,
        module4_completed,
        module5_completed,
        module6_completed,
        worksheet1,    
        hopeBox1,
          homeAssignment1,
        
      minfulness2,
      
      try3,
      homeAssignment3,
      
      thankful4,
      letter4,
      hw4_day1,
      hw4_day2,
      hw4_day3,
      hw4_day4,
      hw4_day5,
      hw4_day6,
      hw4_day7,
      
      survey5,
      strength5,
      homeAssignment5,
      
      activity6,
      feedback6
      } = updatedModuleStatus

      
      const updatedStatus={ userId,
        module1_completed,
        module2_completed,
        module3_completed,
        module4_completed,
        module5_completed,
        module6_completed,
       worksheet1,    
        hopeBox1,
          homeAssignment1,
        
      minfulness2,
      
      try3,
      homeAssignment3,
      
      thankful4,
      letter4,
      hw4_day1,
      hw4_day2,
      hw4_day3,
      hw4_day4,
      hw4_day5,
      hw4_day6,
      hw4_day7,
      
      survey5,
      strength5,
      homeAssignment5,
      
      activity6,
      feedback6
      }
      
      axios.post('http://localhost:5000/users/update', updatedStatus);
      console.log('what updated in back',updatedStatus)
    
  }


const onFailure = (res) => {
  handleClose();
  alert('Google Sign In was unsuccessful. Try again later');
};


const [thankful, setthankful] = useState({
  n1: '',
  n2: '',
  n3: '',
  n4: '',
  n5: '',
});
const createthankful = () => {
    
  if (loggedIn) {
   
    axios.post('http://localhost:5000/thankful', thankful);
    console.log(`submitted: `,thankful,user.name,user.email);
    setthankful({
      n1: '',
      n2: '',
      n3: '',
      n4: '',
      n5: '',
    });
    changeUpdatedModuleStatus(prevState => ({
      ...prevState, 
     thankful4: true,
     
    }));
    
  } else {
    handleShow();
  }
}
  return (
       
    <div className="grat-main" id='thankful'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Sign in before submitting</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <Button variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Sign In
              </Button>)}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
          />
        </Modal.Footer>
      </Modal>
      <div className='grat-cont'>
        <h2>What are you thankful for?</h2>
        <div style={{
                    textAlign:'center',
                    fontSize: 'medium',
                    fontWeight:'500',
                    paddingBottom: '20px',
                    paddingLeft: '75px',
                    paddingRight: '75px'
                }}><u>Instructions:</u> Every person feels grateful or thankful for something, whether it is small or big that does not matter. What matters is that we have aspects of our life that are of value to us and that make us feel good and positive. In this activity, you need to list in the space provided below any 5 aspects that you are grateful for, it could be a person, pet or a thing.
        </div>
        
        <div className='grat-text'>
        <TextField
          id="standard-full-width"
          label="Number 1"
          style={{ margin: 8, width: "50%" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
            
          }}
          value={thankful.n1}
          onChange={(event) => {
            setthankful({ ...thankful, n1: event.target.value })
          }} />
        <TextField
          id="standard-full-width"
          label="Number 2"
          style={{ margin: 8, width: "50%" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={thankful.n2}
          onChange={(event) => {
            setthankful({ ...thankful, n2: event.target.value })
          }} />
        <TextField
          id="standard-full-width"
          label="Number 3"
          style={{ margin: 8, width: "50%" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={thankful.n3}
          onChange={(event) => {
            setthankful({ ...thankful, n3: event.target.value })
          }} />
        <TextField
          id="standard-full-width"
          label="Number 4"
          style={{ margin: 8, width: "50%" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={thankful.n4}
          onChange={(event) => {
            setthankful({ ...thankful, n4: event.target.value })
          }}
        />
        <TextField
          id="standard-full-width"
          label="Number 5"
          style={{ margin: 8, width: "50%" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={thankful.n5}
          onChange={(event) => {
            setthankful({ ...thankful, n5: event.target.value })
          }}
        />
        <div className="Submit-btn">
          <button type="submit" onClick={createthankful} className='primary' style={{marginRight:'57%'}}>
            Submit
                        </button>
                    
        </div>
        </div>
        </div>
    </div>
  );
}

export default Grat