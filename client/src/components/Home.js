import React from 'react'
import './Home.css'
import Intro from '././Intro'
import Hope from '././Modules/HopeModule'


const Home=()=> {
    return (
        
        <div className='home-main' id ='home'>
            {/* <img src="../images/pinkmh.png" style={{width:'100%', height:'1000px'}}/> */}
            <div className='container-home'>
                <div className="home-text">
                <h1>Welcome To WEBSITE Name</h1>
                <br />
                (or anything catchy)
                </div>
                
            </div>
            <Intro />
            <Hope />
        </div>
        
    );
}

export default Home