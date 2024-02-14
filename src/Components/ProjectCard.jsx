import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import SERVER_URL from '../services/serverURL';
function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card className='shadow mb-5 btn' style={{ width: '25rem' }} onClick={handleShow}>
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} height={'250px'}/>
      <Card.Body>
        <Card.Title className='text-dark fw-bold'>{project?.title}</Card.Title>
         </Card.Body>
    </Card>

    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder text-dark'>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
            <img className='img-fluid' style={{height:'250px'}}  src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="project image" />
            </Col>
            <Col sm={12} md={6}>
            <h2 className='fw-bolder text-warning'>{project?.title}</h2>
            <p className='text-dark'>Project Overview: <span className='text-body'>{project?.overview}</span></p>
            <p className='text-dark'>Language Used: <span className='text-body'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className="mt-3">
            <a href={project?.github} target='_blank' className=''style={{cursor:'pointer',color:'black'}}><i style={{height:'34px'}} 
            className="fa-brands fa-github fa-2x"></i></a>
            <a href={project?.website} target='_blank' className='ms-5'style={{cursor:'pointer',color:'black'}} ><i style={{height:'34px'}} 
            className="fa-solid fa-link fa-2x"></i></a>
          </div>
        </Modal.Body>
         </Modal>

    </>
  )
}

export default ProjectCard