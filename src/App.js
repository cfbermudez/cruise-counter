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
      <div>
        <h1 style={{ fontSize: 100, marginLeft:100 }}>{this.props.days} {this.props.hours}:{this.props.minutes}:{this.props.seconds}</h1>
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
      days: '00',  // responsible for the minutes
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
        <DatetimeInput
          placeholder="Please select the Date and Time of your Cruise"
          onChange={this.handleChange}
          onClose={this.startCountDown}
          minDate={moment.now()}>
        </DatetimeInput>
        <div className="row">
          <div className="col-md-4">
            <Timer days={this.state.days} hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds}/>
            <div>
              <div>Days</div>
              <div>Hours</div>
              <div>Minutes</div>
              <div>Seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;