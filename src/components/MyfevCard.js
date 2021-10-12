import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateModal from './UpdateModal';

class MyfevCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            programInfo: {},
            showModal: false
        }
    }

    deleteHandler = (element) => {
        axios.delete(`${process.env.REACT_APP_SERVER}/myfev?_id=${element._id}&email=${this.props.auth0.user.email}`).then(data => {
            this.props.getData(data.data)
        })
    }

    showModal = (element) => {
        this.setState({
            programInfo: element,
            showModal: true
        })
    }

    closeHandle = () => {
        this.setState({
            showModal:false
        })
    }


    
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.programData.imageUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.programData.title}</Card.Title>
                        <Card.Text>
                            ID : {this.props.programData.id}
                            <br />
                            Date Created : {this.props.programData.dateCreated}
                            <br />
                            Description : {this.props.programData.description}
                        </Card.Text>
                        <Button onClick={() => { this.deleteHandler(this.props.programData) }} variant="primary">Delete</Button>
                        <Button onClick={() => { this.showModal(this.props.programData) }} variant="primary">Update</Button>
                    </Card.Body>
                </Card>

                {this.state.showModal && <UpdateModal programInfo={this.state.programInfo} show={this.state.showModal} closeHandle={this.closeHandle} getData={this.props.getData}/>}
            </div>
        )
    }
}

export default withAuth0(MyfevCard);
