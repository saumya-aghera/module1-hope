import React, {useState,useEffect} from 'react'
import './HopeBox.css'
import TextField from '@material-ui/core/TextField';
import { refreshTokenSetup } from '../../utils/refreshToken';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';



const clientId =
  '23157659159-k7of2mgt1a7ipa1hbpjqt7nnajf44d72.apps.googleusercontent.com';

function HopeBox({ loggedIn,onLogin,user,setUser,
      updatedModuleStatus, changeUpdatedModuleStatus}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
   
    changeUpdate();
    
    }, [updatedModuleStatus.hopeBox1])
    

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
    
    if (updatedModuleStatus.worksheet1 && updatedModuleStatus.hopeBox1 && updatedModuleStatus.homeAssignment1) {
     changeUpdatedModuleStatus(prevState => ({
      ...prevState,
      module1_completed:true
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
  
    

    const [hopebox, sethopebox] = useState({
        list: '',
        file: ''
    });


    const createhopebox = () => {
        if (loggedIn) {
            console.log('testing', user)
              
            axios.post('http://localhost:5000/hopebox', hopebox);
            console.log(`Box submitted:`,hopebox,user.name,user.email);
            sethopebox({
                list: '',
                file: ''
            });

            changeUpdatedModuleStatus(prevState => ({
      ...prevState, 
     hopeBox1: true,
     
    }));

        } else {
            handleShow();
        }
        
      }
    return (
        <div id='hopeBox'>
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
            
            <div className="HopeBox-main">
                <div className="outer-box2">
                
                    <h2>HopeBox</h2>
                    <div style={{
                        fontSize: 'medium',
                        fontWeight:'500',
                        paddingLeft: '50px', paddingRight: '50px', paddingBottom: '20px'
                    }}>There are certain people or objects that make you feel hopeful, happy and relaxed. In this activity, you need to list down/upload all the items that make you feel hopeful, if it a person you can even add a picture of that individual.
                    <br /> There is no limit to the number of items that you would like to submit. </div>
                
                
                
   
                
        <div className="box">

                <div className="row">
                <div className="column">
                <div className="list"><TextField id="standard-secondary" label="List it down!" color="primary" value={hopebox.list} onChange={(event)=>{
      sethopebox({ ...hopebox, list: event.target.value})}}/></div>
                </div>
                <div className="column">
                <div className="file-input">
                <input type="file" name="file" id="file" className="inputfile" value={hopebox.file} onChange={(event)=>{
      sethopebox({ ...hopebox, file: event.target.value})}}/>
                    
  
                </div>
                </div>
                    <div className="Submit-btn">
                        <button type="submit" onClick={createhopebox} className='primary'>
                        Submit
                        </button>
                    
                    </div>
                </div>
                
            </div>
            
                </div>
                </div>
        </div>
    )
}

export default HopeBox