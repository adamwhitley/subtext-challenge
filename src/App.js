import React, { Component } from 'react';
import logo from './beer.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faStar, faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Brewery from './Brewery.js';
import './App.css';

/**
 * Page displays list of beers and options
 * for more content.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  /**
   * React hook. Fetches data from REST endpoint.
   */
  componentWillMount() {
    fetch('https://6l36bf3ud0.execute-api.us-east-1.amazonaws.com/dev/beers')
        .then(rsp => rsp.json())
        .then(data => this.setState({ data }));
  }

  /**
   * Function sorts beer list
   * alphabetically by title
   * in Ascending order
   */
  sortAlphaAsc = () => {
    let newdata = [...this.state.data];
    newdata.sort((a, b) => {
      if (a.beer_name > b.beer_name) {
        return -1;
      }
      if (a.beer_name < b.beer_name) {
        return 1;
      }
      return 0;
    });
    this.setState({ data: newdata });
  };

  /**
   * Function sorts beer list
   * alphabetically by title
   * in Descending order
   */
  sortAlphaDesc = () => {
    let newdata = [...this.state.data];
    newdata.sort((a, b) => {
      if (a.beer_name > b.beer_name) {
        return 1;
      }
      if (a.beer_name < b.beer_name) {
        return -1;
      }
      return 0;
    });
    this.setState({ data: newdata });
  };

  /**
   * React hook that renders content.
   * @returns {*}
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <img src={logo} className="App-logo" alt="logo" />
            Beer<span>Finder</span>
          </h1>
          <div className="sort">
            Sort:
            <button type="button" onClick={() => this.sortAlphaAsc()}><FontAwesomeIcon icon={faCaretUp} /></button>
            <button type="button" onClick={() => this.sortAlphaDesc()}><FontAwesomeIcon icon={faCaretDown} /></button>
          </div>
        </header>
        <div className="mainContent">
          {this.state.data.map(beer => {
            return(
            <div className="beer" key={beer.bid}>
              <div className="imgCrop">
                <img alt={'Image of ' + beer.beer_name} src={beer.beer_label} />
              </div>
              <div className="beerInfo">
                <h2>{beer.beer_name}</h2>
                <div className="description">
                  <div className="ibu"><span>IBU</span>{beer.beer_ibu}</div>
                  <div className="abv"><span>ABV</span>{beer.beer_abv}</div>
                  <span className="beerStyle">{beer.beer_style}</span>
                  <div className="beerText">
                    {beer.beer_description}
                  </div>
                  <div className="ratings">
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} /> {beer.rating_score} from {beer.rating_count} reviews
                    </div>
                    <div className="production">
                      <span>In Production</span>
                      <FontAwesomeIcon icon={beer.is_in_production ? faThumbsUp : faThumbsDown} />
                    </div>
                    <div className="homebrew">
                      <span>Homebrew</span>
                      <FontAwesomeIcon icon={beer.is_homebrew ? faThumbsUp : faThumbsDown} />
                    </div>
                  </div>
                </div>
              </div>
              <Brewery id={beer.bid} />
            </div>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
