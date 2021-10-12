import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import MyfevCard from './MyfevCard.js';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      programData: []
    }
  }

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/myfev?email=${this.props.auth0.user.email}`).then(data => {
      this.setState({
        programData: data.data
      })
    })
  }

  getData = (element) => {
    this.setState({
      programData: element
    })
  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.programData.length > 0 ? this.state.programData.map(element => {
          return (<MyfevCard programData={element} getData={this.getData} />)
        }) : <p>Your List is Empty ¯_(ツ)_/¯</p>}

      </>
    )
  }
}

export default withAuth0(MyFavorites);

