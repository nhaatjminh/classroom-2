import React, { useState, useEffect } from "react";
import { Form, Modal, Row, Col, Navbar  } from 'react-bootstrap';
import { NavLink, useParams } from "react-router-dom";
import Assignment from '../Assignment';
import './index.css'

const ListAssignment = () => {
    const params = useParams();
    const [role, setRole] = useState();
    const [arrayAssignment, setArrayAssignment] = useState([]);
    const [show, setShow] = React.useState(false);
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [minus, setMinus] = useState("0");
    const [hour, setHour] = useState("0");
    const [day, setDay] = useState("1");
    const [month, setMonth] = useState("1");
    const [year, setYear] = useState("2020");

    const [loadFirst, setLoadFirst] = useState(true);
    const createAssignment = (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "idClass": params.id,
            "topic": topic,
            "description": description,
            "deadline": minus + ":" + hour + " " + day + "-" + month + "-" + year,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "classes/assignment/" + params.id, requestOptions)
        .then(response =>  {
            console.log(response);
            return response.text();
        })
        .then(result => {
            console.log(result);
            alert("Assignment Created!");
        })
        .catch(error => {
            console.log('error', error)
            alert("An error occur");
        });
    }

    const getListAssignment = () => {
        return arrayAssignment.map((ele) => <Assignment key={ele.id} dataAssignment={ele}/>)
    }

    const getNumberOptionForCombobox = (from, to) => {
        let options = [];
        for (let i = from; i <= to; i++) {
            options.push(<option value={i}>{i}</option>);
        }
        return options;
    }

    const topicOnChangeHandler = (e) => setTopic(e.target.value);
    const descriptionOnChangeHandler = (e) => setDescription(e.target.value);
    const minusOnChangeHandler = (e) => setMinus(e.target.value);
    const hourOnChangeHandler = (e) => setHour(e.target.value);
    const dayOnChangeHandler = (e) => setDay(e.target.value);
    const monthOnChangeHandler = (e) => setMonth(e.target.value);
    const yearOnChangeHandler = (e) => setYear(e.target.value);
	const onHandleModalClose = () => setShow(false);
	const onHandleModalShow = () => setShow(true);
    const getRole = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "classId": params.id
            });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

        await fetch(process.env.REACT_APP_API_URL + "accounts/role/" + localStorage.getItem("userId"), requestOptions)
        .then(response => response.json())
        .then(result => {
            setRole(result[0].role)
            console.log(result[0].role);
        })
        .catch(error => console.log('error', error));
    }
    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "assignment/" + params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                // TODO
                setArrayAssignment(result);
            }
        })
        .catch(error => {
            console.log('error', error);
        })
    }, [params.id]);
    if (loadFirst) {
        getRole();
        setLoadFirst(false);
    }
    const detailURL = '/classes/detail/' + params.id;
    const memberURL = '/classes/members/' + params.id;
    const test = process.env.REACT_APP_API_URL + "assignment/" + params.id;
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    
                    {/* <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button> */}
                <Navbar.Toggle /> 
                <div className="btn-new" hidden={!(role === 'teacher')}>
                    <button className="btn btn-success" onClick={onHandleModalShow}> Add New </button>
                </div>
                <Navbar.Collapse className="justify-content-end">
                <NavLink className="nav-link" to={detailURL} >
                    Detail
                </NavLink>
                <NavLink className="nav-link" to={memberURL}>
                    People
                </NavLink>
                <NavLink className="nav-link" to='#'>
                    List Assignment
                </NavLink>
                </Navbar.Collapse>
            </Navbar>
            <div className="list-assignment">
                {getListAssignment()}
            </div>
            <Modal show={show} onHide={onHandleModalClose} dialogClassName="modal-70w">
                <Modal.Header closeButton>
                <Modal.Title>Adding Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label> Topic </Form.Label>
                            <Form.Control type="text" 
                                        value={topic}
                                        onChange={topicOnChangeHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Description </Form.Label>
                            <Form.Control as="textarea" 
                                        style={{ height: '100px' }}
                                        onChange={descriptionOnChangeHandler} />
                        </Form.Group>

                        <Row>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Minus </Form.Label>
                                    <Form.Select onChange={minusOnChangeHandler}>
                                        {getNumberOptionForCombobox(0, 60)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Hour </Form.Label>
                                    <Form.Select onChange={hourOnChangeHandler}>
                                        {getNumberOptionForCombobox(0, 24)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Day </Form.Label>
                                    <Form.Select onChange={dayOnChangeHandler}>
                                        {getNumberOptionForCombobox(1, 31)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Month </Form.Label>
                                    <Form.Select onChange={monthOnChangeHandler}>
                                        {getNumberOptionForCombobox(1, 12)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Year </Form.Label>
                                    <Form.Select onChange={yearOnChangeHandler}>
                                        {getNumberOptionForCombobox(2000, 2020)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footer-createBtnAssign text-center">
                        <button className="btn btn-dark btnAssign" onClick={createAssignment}> Create </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListAssignment;