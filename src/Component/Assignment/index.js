
import React from 'react';
import { Card} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import './index.css';

const Assignment = ({dataAssignment}) => {

    return( 
    <Card className="assignment mx-auto">
        <Card.Header as= "h2" className="head-center"> {dataAssignment.topic} </Card.Header>
        <Card.Body>            
            {/* <Card.Title> Abc </Card.Title> */}
            <Card.Text> {dataAssignment.description} </Card.Text> 
            
            <Card.Text> {dataAssignment.deadline} </Card.Text>   
        </Card.Body>
        {/* <Card.Footer className="text-center">
        <Link className="linkBtn" to={this.state.url}>Detail</Link>
        </Card.Footer> */}
    </Card>
    )
};

export default Assignment;