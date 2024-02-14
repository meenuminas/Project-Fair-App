import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import imgg from '../assets/imgg.png'
import SERVER_URL from '../services/serverURL';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateProjectAPI } from '../services/allAPI';
import { useCol } from 'react-bootstrap/esm/Col';
import { updateResponseContext } from '../Context/ContextShare';


function Edit({project}) {
const{editResponse,setEditResponse}=useContext(updateResponseContext)
  //state 
  const[projectData,setprojectData]=useState({
    id:project._id,title:project.title,languages:project.languages,overview:project.overview,
    github:project.github,
    website:project.website,projectImage:""
   })
   //to edit
   const[preview,setPreview]=useState("")
  const[show,setShow]=useState(false)
  const handleShow=()=>setShow(true)
  const handleClose=()=>{
    setShow(false)
    setprojectData({
      id:project._id,title:project.title,languages:project.languages,overview:project.overview,
      github:project.github,
      website:project.website,projectImage:""
     })
     setPreview("")
  }
  useEffect(()=>{
     if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
     }else{
      setPreview("")
     }
  },[projectData.projectImage])

  const handleUpdateProject=async()=>{
    const { id,title,languages,overview, github,website,projectImage}=projectData
    if(!title||!languages||!overview||!github||!website){
  toast.info("Please fill the form Completely!!!")
    }else{
      const reqBody=new FormData()
     reqBody.append("title",title)
     reqBody.append("languages",languages)
     reqBody.append("overview",overview)
     reqBody.append("github",github)
     reqBody.append("website",website)
     preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

     const token=sessionStorage.getItem("token")
     if(token){
      const reqHeader={
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
       }
       console.log("proceeed to api call");
       try{
          const result=await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status===200){
               handleClose()
               //share response to MyProject
               setEditResponse(result.data)
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
    <>
    <button onClick={handleShow} style={{textDecoration:'none'}} className="btn btn-link text-warning d-flex align-items-center fw-bolder"><i style={{height:'34px'}}
    className='fa-solid fa-edit fa-2x me-2 text-success'></i></button>
  <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:'lemon'}}>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setprojectData({...projectData,
                projectImage:e.target.files[0]})}  />
     <img src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="project upload pic" className='mt-5 ' width={'200px'} height={'200px'}/>
              </label>
            </div>
            <div className="col-lg-8">
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project Title' value={projectData.title} onChange={e=>setprojectData({...projectData,title:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn " placeholder='Language Used' value={projectData.languages} onChange={e=>setprojectData({...projectData,languages:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project GitHub Link'value={projectData.github} onChange={e=>setprojectData({...projectData,github:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project Website Link' value={projectData.website} onChange={e=>setprojectData({...projectData,website:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project Overview' value={projectData.overview} onChange={e=>setprojectData({...projectData,overview:e.target.value})}/>
                    </div>
            </div>
           </div>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleUpdateProject}>UPDATE</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'/>
    </>
  )
}

export default Edit