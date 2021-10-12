import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

class APICard extends Component {

    addHandler = (element) => {
        let programInfo = { id: element.id, title: element.title, dateCreated: element.dateCreated, description: element.description, imageUrl: element.imageUrl, email: this.props.auth0.user.email }
        axios.post(`${process.env.REACT_APP_SERVER}/myfev`, programInfo)
    }
    render() {
        const { isAuthenticated } = this.props.auth0
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
                        <Button onClick={() => { isAuthenticated && this.addHandler(this.props.programData) }} variant="primary">Add To My Fev</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withAuth0(APICard);
