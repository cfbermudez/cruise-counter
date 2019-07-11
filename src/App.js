import React, { Component } from 'react';
import logo from './logo.svg';
import { DatetimeInput } from 'react-datetime-inputs'
import * as moment from 'moment'

import './App.css';

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to CFB Cruise Countdown</h2>
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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      seconds: '00',   // responsible for the seconds 
      minutes: '00',  // responsible for the minutes
      hours: '00',  // responsible for the Hours
      days: '00',  // responsible for the Days
      isClicked : false
    }
    this.secondsRemaining; 
    this.intervalHandle;
    this.handleChange = this.handleChange.bind(this);
    // method that triggers the countdown functionality
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }
  
  handleChange(momentValue) {
    var duration = moment.duration(momentValue.diff(moment.now()));
    this.setState({
      seconds: duration.seconds(),
      minutes: duration.minutes(),
      hours: duration.hours(),
      days: duration.days()
    });
  }
  
  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })
    }
    if (min < 10) {
      this.setState({
        minutes: "0" + min,
      })
    }
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--
  }
  
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60;
    this.setState({
      isClicked : true
    })
  }
  
  render() {
    return (
      <div className="App">
        <Header/>
        <Timer days={this.state.days} hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds}/>
        <div className="DatetimeInputHolder">
          <DatetimeInput
            placeholder="Please select the Date and Time of your Cruise"
            onChange={this.handleChange}
            onClose={this.startCountDown}
            minDate={moment.now()}>
          </DatetimeInput>
        </div>
      </div>
    );
  }
}
export default App;