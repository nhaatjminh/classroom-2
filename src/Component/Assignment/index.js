
import React from 'react';
import { useParams } from "react-router-dom";
import { Card} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import './index.css';

const Assignment = ({dataAssignment}) => {
    const params = useParams();
    
    const deleteAssignment = (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(process.env.REACT_APP_API_URL + "assignment/delete/" + params.id + "/" + dataAssignment.id);
        fetch(process.env.REACT_APP_API_URL + "assignment/delete/" + params.id + "/" + dataAssignment.id, requestOptions)
        .then(response =>  {
            console.log(response);
            return response.text();
        })
        .then(result => {
            console.log(result);
            alert("Assignment Delete!");
            window.location.reload();
        })
        .catch(error => {
            console.log('error', error)
            alert("An error occur");
        });
    }

    return( 
    <Card className="assignment mx-auto">
        <Card.Header as= "h2" className="head-center"> {dataAssignment.topic} </Card.Header>
        <Card.Body>            
            {/* <Card.Title> Abc </Card.Title> */}
            <Card.Text> {dataAssignment.description} </Card.Text> 

            <Card.Text> {dataAssignment.deadline} </Card.Text>   
        </Card.Body>
        <Card.Footer className="text-center">
            <div className="footer-createAssignBtn text-center">
                <button className="btn btn-danger btnDeleteAssign" onClick={deleteAssignment}> Delete </button>
                <button className="btn btn-info btnDeleteAssign"> Update </button>
            </div>
        </Card.Footer>
    </Card>
    )
};

export default Assignment;