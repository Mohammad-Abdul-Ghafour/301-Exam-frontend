import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import APICard from './APICard';
import axios from 'axios';


class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            programData: []
        }
    }

    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/home`).then(data => {
            this.setState({
                programData: data.data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <div style={{display:"flex",width:"90%",justifyContent:"space-evenly",flexWrap:"wrap",marginLeft:"auto",marginRight:"auto"}}>
                    {this.state.programData.map(element => {
                    return(<APICard programData={element} />)
                }) }
                </div>
                
                
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
