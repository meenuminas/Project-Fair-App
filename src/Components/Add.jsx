import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import imgg from '../assets/imgg.png'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../Context/ContextShare';
function Add() {
  //data sharing using context API
 const{addResponse,setAddResponse}= useContext(addResponseContext)
  const[projectData,setprojectData]=useState({
   title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
  //to chek the status of image file
  const[imagefileStatus,setimageFilestatus]=useState(false)
  ///for useeffect to get the url
  const[preview,setPreview]=useState("")
  console.log(projectData);
  const[show,setShow]=useState(false)
  const handleShow=()=>setShow(true)
  const handleClose=()=>{
    setShow(false)
    setprojectData({title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
    setPreview(imgg)
  }
  useEffect(()=>{
 if(projectData.projectImage?.type=="image/png"||projectData.projectImage?.type=="image/jpg"
 ||projectData.projectImage?.type=="image/jpeg"){
  //console.log("generate image url");
  setimageFilestatus(true)
  setPreview(URL.createObjectURL(projectData.projectImage))
 }else{
  setPreview("")
  setprojectData({...projectData,projectImage:""})
  setimageFilestatus(false)
  //console.log("Upload only the following file types(jpg,jpeg,png");
 }
  },[projectData.projectImage])

  const handleSave=async()=>{
    const {title,languages,overview,github,website,projectImage}=projectData
    if(!title||!languages||!overview||!github||!website||!projectImage){
      toast.info ("Please fill the form completely")
    }else{
    
     const reqBody=new FormData()
     reqBody.append("title",title)
     reqBody.append("languages",languages)
     reqBody.append("overview",overview)
     reqBody.append("github",github)
     reqBody.append("website",website)
     reqBody.append("projectImage",projectImage)

     const token=sessionStorage.getItem("token")
     if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       console.log('proceed to api call');
       try{
   const result=await addProjectAPI(reqBody,reqHeader)
   console.log(result);
   if(result.status===200){
    //toast.success(`New Project ${result.data.title} has added successfully`)

    //share response to context
    setAddResponse(result.data)
    handleClose()
   }else{
  toast.warning(result.response.data)
   }
       }
       catch(err){
            console.log(err);
       }
     }    
    }
}
  return (
    <>
    <button onClick={handleShow} style={{textDecoration:'none'}} className="btn btn-link text-warning d-flex align-items-center fw-bolder ms-auto"><i style={{height:'34px'}}
    className='fa-solid fa-plus fa-2x me-2'></i></button>
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
                projectImage:e.target.files[0]})} />
     <img src={preview?preview:imgg} alt="project upload pic" className='mt-5 ' width={'200px'} height={'200px'}/>
              </label>
             {!imagefileStatus&&<div className="text-danger nn">*Upload only the following file types(jpg,jpeg,png)*</div>}
            </div>
            <div className="col-lg-8">
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project Title' value={projectData.title} onChange={e=>setprojectData({...projectData,title:e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn " placeholder='Language Used' value={projectData.languages} onChange={e=>setprojectData({...projectData,languages:e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="border rounded p-2 w-100 nn" placeholder='Project GitHub Link' value={projectData.github} onChange={e=>setprojectData({...projectData,github:e.target.value})} />
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
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default Add