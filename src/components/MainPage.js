import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import './MainPage.css';


class MainPage extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  filteredRobots = () => {
    return this.props.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
    });
  }

  render() {
    const {onSearchChange, isPending } = this.props;

    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <Header />
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={this.filteredRobots()} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

export default MainPage;