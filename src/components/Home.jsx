import React, { useState } from "react";
import { Link } from "react-router";
import { GoArrowUpRight } from "react-icons/go";
import heroImg from '../assets/download (1).png'
import './Home.css'
function Home(){
    const [username,setUsername] = useState("")
 const handleSave=()=>{
    localStorage.setItem("username",username)
 }
    return(  <>
       <div className="header">
         <h3>BudgetBee</h3>
       </div>
       <div className="hero-section">
         <div className="hero-area">
          <p className="hero-text">Get Your <br></br> Finances <br></br>
          Under Control</p>
          <p className="hero2">Take control of your finances effortlessly.</p>
          <div className="home-btn">
       <input type="text" value={username} onChange={ (e)=>setUsername(e.target.value)} placeholder="Enter your Name"></input>
       <div className="get-started">
       <Link  to="/dashboard"  onClick={handleSave}  style={{textDecoration: 'none', color:'rgba(255, 255, 255, 1)'}}>Get Started</Link> <GoArrowUpRight  size={20}/>
       </div>
     
       </div>
         </div>
         <div className="hero-img"> 
            <img src={heroImg}></img>

         </div>
       </div>
       

       
    </>
    )
  
}

export default Home