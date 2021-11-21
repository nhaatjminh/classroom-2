
import React from 'react';
import { Card} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import './index.css';

const Assignment = () => {

    return( 
    <Card className="assignment">
        <Card.Header as= "h5"> Assignment Title </Card.Header>
        <Card.Body>            
            {/* <Card.Title> Abc </Card.Title> */}
            <Card.Text> deadline </Card.Text>   
        </Card.Body>
        {/* <Card.Footer className="text-center">
        <Link className="linkBtn" to={this.state.url}>Detail</Link>
        </Card.Footer> */}
    </Card>
    )
};

export default Assignment;