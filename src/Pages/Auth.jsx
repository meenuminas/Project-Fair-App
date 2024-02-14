import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimage from '../assets/loginimage.png'
import Form from 'react-bootstrap/Form';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({insideRegister}) {
  const{isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)
  const[loginStatus,setLoginstatus]=useState(false)
  const navigate=useNavigate()
  // console.log(insideRegister);
  const[userInputdata,setuserInputdata]=useState({
    username:"",
    email:"",
    password:""
  })

  const handleRegister=async (e)=>{
    e.preventDefault()
      // console.log(userInputdata);
      const {username,email,password}=userInputdata
      if(!username||!email||!password){
        toast.info("Please fill the form completely")
      }else{
        // toast.success("proceed to register api")
       try{
     const result=await registerAPI(userInputdata)
     console.log(result);
     if(result.status===200){
      toast.success(`Welcome ${result.data.username}...Please login to explore our site`)
      setuserInputdata({username:"",email:"",password:""})
      //navigate to login
      setTimeout(()=>{
        navigate("/login")
      },2000)
     }else{
      toast.error(result.response.data)
     }
       }catch(err){
        console.log(err);
       }
      }

  }
  const handleLogin=async (e)=>{
    e.preventDefault()
      // console.log(userInputdata);
      const {email,password}=userInputdata
      if(!email||!password){
        toast.info("Please fill the form completely")
      }else{
        // toast.success("proceed to register api")
       try{
     const result=await loginAPI({email,password})
     console.log(result);
     if(result.status===200){
      //store token,username
      sessionStorage.setItem("username",result.data.existingUser.username)
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
      setLoginstatus(true)
     setIsAuthorized(true)
      //navigate to landing page
    setTimeout(() => {
      setuserInputdata({email:"",password:""})
      navigate("/")
    }, 2000);
      }else{
      toast.error(result.response.data)
     }
       }catch(err){
        console.log(err);
       }
      }

  }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
  <div className="container w-75">
    <Link to={'/'} style={{textDecoration:'none'}} className='text-info'><i className='fa-solid fa-arrow-left'></i>Back to Home</Link>
    <div className="card shadow p-5 bg-success">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img className='w-100' src={loginimage} alt="Authentication" />
        </div>
        <div className="col-lg-6">
          <h1 className='fw-bolder text-light mt-2'>
            <i style={{height:'41px'}} className='fa-solid fa-hands-holding-circle me-3'></i>Project Fair
          </h1> 
          <h5 className="fw-bolder text-light mt-2">Sign {insideRegister?"up":"in"} to your Account</h5>
          
          <Form>
            {
          insideRegister&&
          <Form.Group className="mb-3" controlId="formBasicName">
     
          <Form.Control type="text" placeholder="Enter Name" className='nn' value={userInputdata.username}
          onChange={e=>setuserInputdata({...userInputdata,username:e.target.value})}/>
        </Form.Group>
        
            }
      <Form.Group className="mb-3" controlId="formBasicEmail">
      
        <Form.Control type="email" placeholder="Enter email"className='nn' value={userInputdata.email}
          onChange={e=>setuserInputdata({...userInputdata,email:e.target.value})}/>
        
      </Form.Group>

    
      <Form.Group className="mb-3" controlId="formBasicPaswd">

        <Form.Control type="password" placeholder="Enter Password"  className='nn' value={userInputdata.password}
          onChange={e=>setuserInputdata({...userInputdata,password:e.target.value})}/>
      </Form.Group>
    {
      insideRegister?
     <div>
      <button onClick={handleRegister} className='btn btn-light mb-2'><span className='nnn'>Register</span></button>
      <p>Already have an Account? Click here to <Link to={'/login'} className='text-light'>Login</Link></p>
    
     </div>:
    

<div>
      <button onClick={handleLogin} className='btn btn-light mb-2 '><span className='nnn'>Login {loginStatus && <Spinner animation="border" variant="dark" />}</span></button>
      <p>New User? Click here to <Link to={'/Register'} className='text-light'>Register</Link></p>
    
     </div>
    
    }
    </Form>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer autoClose={3000} theme='colored'/>
    </div>
  )
}

export default Auth