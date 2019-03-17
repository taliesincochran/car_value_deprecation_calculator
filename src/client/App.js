/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';

import './app.css';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'json');

/**
 * @class App
 * @constructor
 * @params {any} props
 * @properties {string []} makes
 * @properties {string} currentDate
 * @properties {string} modelYear
 * @properties {string []} models
 * @properties {number} mileage
 * @properties {number} colisions
 * @properties {number} numberOfOwners
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: ['placeholder'],
      currentDate: undefined,
      modelYear: undefined,
      models: [],
      year: undefined,
      colisions: 0,
      numberOfOwners: 1,
      mileage: 0,
    };
  }
  /**
   * Fetch all the makes when component mounts
   */

  componentDidMount() {
    axios.get('/api/makes')
      .then((res) => {
        console.log(res);
        this.setState({ makes: res.data });
      }).catch((error) => {
        console.log(error);
        this.setState({ makes: [] });
      });
  }

  render() {
    const { makes } = this.state;
    return (
      <div>
        {makes.map(make => <p key={make}>{ make }</p>)}
      </div>
    );
  }
}
