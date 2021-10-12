import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class UpdateModal extends Component {
    updateHandler = (event) => {
        event.preventDefault();
        let programData = {
            _id: this.props.programInfo._id, id: event.target.id.value,
            title: event.target.title.value,
            dateCreated: event.target.dateCreated.value, description: event.target.description.value,
            imageUrl: event.target.imageUrl.value, email: this.props.auth0.user.email
        }
        axios.put(`${process.env.REACT_APP_SERVER}/myfev`, programData).then(data => {
            this.props.getData(data.data)
            this.props.closeHandle();
        })
    }
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.closeHandle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.updateHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" name="id" placeholder="id" defaultValue={this.props.programInfo.id} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder="title" defaultValue={this.props.programInfo.title} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Date Created</Form.Label>
                                <Form.Control type="text" name="dateCreated" placeholder="dateCreated" defaultValue={this.props.programInfo.dateCreated} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" placeholder="description" defaultValue={this.props.programInfo.description} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control type="text" name="imageUrl" placeholder="imageUrl" defaultValue={this.props.programInfo.imageUrl} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeHandle}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withAuth0(UpdateModal);
