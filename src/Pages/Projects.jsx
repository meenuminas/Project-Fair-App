import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getallprojectAPI } from '../services/allAPI'

function Projects() {
  const[searchkey,setSearchkey]=useState("")
  const [allProjects,setallProjects]=useState([])
  const getallProject=async()=>{
    try{
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
         }
      
    const result=await getallprojectAPI(searchkey,reqHeader)
    if(result.status===200){
        setallProjects(result.data)
    }
}
}catch(err){
    console.log(err);
}
}
console.log(allProjects);
useEffect(()=>{
  getallProject()
},[searchkey])
  return (
    <>
        <Header></Header>
        <div style={{marginTop:'150px'}} className='container'>
          <div className="d-flex justify-content-between">
          <h1 className='nnn'>All Projects</h1>
          <input onChange={e=>setSearchkey(e.target.value)} style={{width:'300px'}} type="text" className='rounded nn' placeholder='Search Projects by Language Used'/>
          </div>
         <Row className='mt-5'>
         {allProjects.length>0?allProjects.map((project,index)=>(
             <Col key={index} sm={12} md={6} lg={4}>
             <ProjectCard project={project}></ProjectCard>
           </Col>
         )):
         <div className="fw-bolder fs-4 text-danger">Nothing to display!!</div>
         }
         </Row>
        </div>
        </>
  )
}

export default Projects