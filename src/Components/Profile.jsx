import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadimg from '../assets/uploadimg.jpg'
import SERVER_URL from '../services/serverURL';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateUserProfileAPI } from '../services/allAPI';
function Profile() {
  const [open, setOpen] = useState(false);
  const[userData,setUserData]=useState({
    username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })
  const[existingImage,setExistingimage]=useState("")
  const[preview,setPreview]=useState("")
  useEffect(()=>{
  if(sessionStorage.getItem("userDetails")){
    const userDetails=JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,
      github:userDetails.github,linkedin:userDetails.linkedin})
  setExistingimage(userDetails.profile)
  }

  },[open])

  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }else{
      setPreview("")
    }

  },[userData.profileImage])
  console.log(userData);
  const handleProfileUpdate=async(e)=>{
    e.preventDefault()
    const{username,password,email,github,linkedin,profileImage}=userData
    if(!github||!linkedin){
   toast.info("Please fill the Form Completely")
    }else{
 //proceed to api call
 const reqBody=new FormData()
 reqBody.append("username",username)
 reqBody.append("password",password)
 reqBody.append("email",email)
 reqBody.append("github",github)
 reqBody.append("linkedin",linkedin)
 preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

 const token=sessionStorage.getItem("token")
 if(token){
  const reqHeader={
    "Content-Type":preview?"multipart/form-data":"application/json",
    "Authorization":`Bearer ${token}`
   }
   //api call
try{
  const result=await updateUserProfileAPI(reqBody,reqHeader)
  if(result.status==200){
   setOpen(!open)
   sessionStorage.setItem("userDetails",JSON.stringify(result.data))
  }else{
    console.log(result);
  }

}catch(err){
  console.log(err);
}
 }
    }
  }
  return (
    
      <div className='border rounded p-2 ' style={{marginTop:'30px'}}>
        <div className="d-flex justify-content-between">
          <h2 className='nn'>Profile</h2>
          <button onClick={() => setOpen(!open)} className="btn btn-outline-warning"><i className='fa-solid fa-caret-down'></i></button>
          
        </div>
        <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">
       <form>
         <label >
          <input type="file" style={{display:'none'}} onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})} />
         {existingImage==""?
         <img src={preview?preview:uploadimg} alt="upload image" width={'200px'} className='img-fluid rounded-circle' 
          />:
          <img src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="upload image" width={'200px'} className='img-fluid rounded-circle' 
          />}
       
         </label>
         
          <div className='mb-2'>
            <input type="text" className='rounded p-1 w-75 nn' placeholder='Enter your GitHub URL' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}/>
         </div>
         <div className='mb-2'>
            <input type="text" className='rounded p-1 w-75 nn' placeholder='Enter your Linkedin URL'value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} />
         </div>
         <div className="mb-2 d-grid w-75 mx-auto ">
       <button onClick={handleProfileUpdate} className="btn btn-warning"><span className='nnn'>UPDATE</span></button>
         </div>
       </form>
       
        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored'/>
      </div>
    
   
  )
}

export default Profile