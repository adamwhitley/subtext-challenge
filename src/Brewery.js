import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import './App.css';

/**
 * Component displays Brewery Info
 */
class Brewery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      data: []
    }
  }

  /**
   * React hook. Fetches data from REST endpoint.
   */
  componentWillMount() {
    fetch('https://6l36bf3ud0.execute-api.us-east-1.amazonaws.com/dev/beer/' + this.state.id)
        .then(rsp => rsp.json())
        .then(data => this.setState({ data: data[0].brewery }));
  }

  /**
   * React hook that renders content.
   * @returns {*}
   */
  render() {
    return (
      <div className="Brewery">
          <div className="beer" key={this.state.data.id}>
            <img alt={'Image of ' + this.state.data.brewery_name} src={this.state.data.brewery_label} />
            <h2>{this.state.data.brewery_name}</h2>
            <div className="description">
              <a href={this.state.data.contact} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGlobe}/>
              </a>
              <a href={this.state.data.contact} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook}/>
              </a>
              <a href={'https://twitter.com/' + this.state.data.contact} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter}/>
              </a>
            </div>
          </div>
      </div>
    );
  }
}

export default Brewery;
