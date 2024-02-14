import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, getuserprojectAPI, updateProjectAPI } from '../services/allAPI'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'

function Myprojects() {
  const{editResponse,setEditResponse}=useContext(updateResponseContext)
  //data sharing using context api
  const{addResponse,setAddResponse}= useContext(addResponseContext)
  const [userProjects,setuserProjects]=useState([])
  
  const getuserProject=async()=>{
    try{
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
         }
      
    const result=await getuserprojectAPI(reqHeader)
    if(result.status===200){
        setuserProjects(result.data)
    }
}
}catch(err){
    console.log(err);
}
}
console.log(userProjects);
useEffect(()=>{
  getuserProject()
},[addResponse,editResponse])

const handleDeleteProject=async(projectId)=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }
     try{
      const result=await deleteProjectAPI(projectId,reqHeader)
      if(result.status==200){
        getuserProject()
      }else{
        console.log(err);
      }
     }catch(err){
      console.log(err);
     }
  }
}
  return (
    <div className='border rounded p-2' style={{marginTop:'30px'}}>
      <div className="d-flex justify-content-between">
        <h2>My Projects</h2>
        <Add></Add>
      </div>

      <div className="mt-4">
       {userProjects?.length>0?userProjects.map((project,index)=>(
       <div key={index} className="border rounded d-flex justify-content-between mb-3 p-2 align-items-center">
       <h5>{project?.title}</h5>
        <div className="icons d-flex align-items-center">
         <Edit project={project}></Edit>
         <a href={project?.github} target='_blank' className='btn btn-link ms-2'><i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
        <button onClick={()=>handleDeleteProject(project._id)} className='btn btn-link text-danger ms-2'><i style={{height:'34px'}} className='fa-solid fa-trash fa-2x'></i></button>
        </div>
     </div>
       )):<div className='text-danger fw-bolder '>No projects Uploaded</div>
     
      }
      </div>
    </div>
  )
}

export default Myprojects