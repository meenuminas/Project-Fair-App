import React, { useEffect, useState } from 'react'
import projectimmgmearn from '../assets/projectimmgmearn.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getHomeprojectAPI } from '../services/allAPI';

function Home() {
    //to hold the projects to display
    const[allProjects,setallProjects]=useState("")
    const[loginStatus,setLoginstatus]=useState(false)
    const navigate=useNavigate()
 
    const gethomeProject=async()=>{
        try{
        const result=await getHomeprojectAPI()
        if(result.status===200){
            setallProjects(result.data)
        }
    }
    catch(err){
        console.log(err);
    }
}

    const handleNavigate=()=>{
        if(loginStatus===true){
        navigate('/projects')
    }else{
        toast.warning("Please Login to get full access to our Projects!!")
    }
    }
    useEffect(()=>{
        gethomeProject()
   if(sessionStorage.getItem("token")){
    setLoginstatus(true)
   }
   else{
    setLoginstatus(false)
   }
    },[])
    console.log(allProjects);
  return (
    <>
    <div style={{height:'100vh',backgroundColor:'#90ee90'}} className='w-100 d-flex justify-content-center align-items-center rounded'>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h1 style={{fontSize:'80px'}} className='fw-bolder text-light mvb-3'>
                        <i style={{height:'85px'}} className='fa-solid fa-hands-holding-circle'></i>
                       &nbsp;Project Fair
                    </h1>
                    <p style={{textAlign:'justify'}}>One Stop Destination for all Sofware Development Project where user can add and Mnaage their Projects.As well as access all projects available in our website..What are you waiting for!!!</p>
                  {loginStatus?<Link className='btn btn-warning mt-5'to={'/dashboard'}>Manage Your Project <i className='fa-solid fa-arrow-right'></i>
                    </Link>:  <Link className='btn btn-warning mt-5'to={'/login'}>Starts to Explore <i className='fa-solid fa-arrow-right'></i>
                    </Link>}
                </div>
                
                <div className='col-lg-1'></div>
        <div className='col-lg-4'>
            <img className='img-fluid'  src={projectimmgmearn} alt="landing" />
        </div>
            </div>
        </div>
    </div>
    <div className='mt-5'>
        <h1 className='text-center mb-5 text-dark fw-bold'>Explore Our Projects</h1>
        <marquee>
            <div className="d-flex">
                {
                    allProjects?.length>0&&
                    allProjects.map((project,index)=>(
                        <div key={index} className="project me-5">
                        <ProjectCard project={project}></ProjectCard>
                    </div>
                    ))
                }
                
            </div>
        </marquee>
        <div className='text-center'>
            <button onClick={handleNavigate} className='btn btn-link fw-bold '>View More Projects</button>
        </div>
    <ToastContainer autoClose={3000} theme='colored'></ToastContainer>
    </div>
    </>
  )
}

export default Home