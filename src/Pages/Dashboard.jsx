import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Myprojects from '../Components/Myprojects'
import Profile from '../Components/Profile'


function Dashboard() {
  const[username,setUsername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
     }
     else{
      setUsername("")
     }
  },[])
 
  return (
    <>
    <Header insideDashboard></Header>
      <div style={{marginTop:'150px'}} className='container'>
<h1 className='nn'>Welcome <span className='text-success nn'>{username.split(" ")[0]}</span></h1>
<div className="row">
  <div className="col-lg-8">
    <Myprojects></Myprojects>
  </div>
  <div className="col-lg-4">
    <Profile></Profile>
  </div>

</div>

      </div>
      </>
  )
}

export default Dashboard