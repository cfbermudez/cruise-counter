import React, { Component } from 'react';
import logo from './images/logo.svg';
import image from './images/cruise-Image.jpg';
import { DatetimeInput } from 'react-datetime-inputs';
import * as moment from 'moment';

import './css/App.css';

class Header extends React.Component {
  render() {
    return (
      <div className="App-header" style={{backgroundImage: `url(${image})`}}>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="App-footer">
        <img src={logo} className="App-logo" alt="React Logo" />
        Powered by: Reactjs
      </div>
    );
  }
}
class Timer extends React.Component {
  render() {
    return (
      <div className="CounterHolder">
        <div className="CounterDigit">
          {this.props.days}
          <div className="CounterLabel">Days</div>
        </div>
        <div className="CounterDigit">
          {this.props.hours}
          <div className="CounterLabel">Hours</div>
        </div>
        <div className="CounterDigit">
          {this.props.minutes}
          <div className="CounterLabel">Minutes</div>
        </div>
        <div className="CounterDigit">
          {this.props.seconds}
          <div className="CounterLabel">Seconds</div>
        </div>
      </div>
    );
  }
}

class CompleteMessage extends React.Component {
  render(){
    return(
      <div style={{display:this.props.display}} className="CompleteMessage">
        <h1>Congratulations</h1>
        <h2>Your Cruise has begun</h2>
        <h2>Have fun</h2>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      seconds: '00',   // responsible for the seconds 
      minutes: '00',  // responsible for the minutes
      hours: '00',  // responsible for the Hours
      days: '00',  // responsible for the Days
      completed: "none"
    }
    // method that handle the date time change
    this.handleChange = this.handleChange.bind(this);
    // method that triggers the countdown functionality
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }
  
  handleChange(momentValue) {
    clearInterval(this.intervalHandle);
    var duration = moment.duration(momentValue.diff(moment.now()));
    this.setState({
      seconds: this.formatNumber(duration.seconds()),
      minutes: this.formatNumber(duration.minutes()),
      hours: this.formatNumber(duration.hours()),
      days: this.formatNumber(duration.days())
    });
  }
  
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
  }
  
  tick() {
    var currentDuration=moment.duration({
      seconds: this.state.seconds,
      minutes: this.state.minutes,
      hours: this.state.hours,
      days: this.state.days
    });
    currentDuration.subtract(1,'s');
    this.setState({
      seconds: this.formatNumber(currentDuration.seconds()),
      minutes: this.formatNumber(currentDuration.minutes()),
      hours: this.formatNumber(currentDuration.hours()),
      days: this.formatNumber(currentDuration.days())
    })
    if (currentDuration.days() === 0 & currentDuration.hours() ===0 & currentDuration.minutes() === 0 & currentDuration.seconds() === 0) {
      clearInterval(this.intervalHandle);
      this.setState({
        completed : "flex"
      });
    }
  }

  formatNumber(number){
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  
  render() {
    return (
      <div className="App">
        <Header></Header>
        <h2>Welcome to <u>BookCruiseCabins.com</u> Cruise Countdown Creator</h2>
        <Timer days={this.state.days} hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds}/>
        <CompleteMessage display={this.state.completed} />
        <div className="DatetimeInputHolder">
          <DatetimeInput
            placeholder="Please select the Date and Time of your Cruise"
            onChange={this.handleChange}
            onClose={this.startCountDown}
            minDate={moment.now()}>
          </DatetimeInput>
        </div>
        <Footer>/</Footer>
      </div>
    );
  }
}
export default App;