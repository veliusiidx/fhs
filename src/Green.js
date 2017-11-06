import React, { Component } from 'react';
import * as rs from './actiontypes.js';
import { connect } from "react-redux";
import SuddenPlus from './SuddenPlus.js';
import HS from './HS.js';

//This part of the code just handles user data entry. All of the calculation is done in HS.

class Green extends Component {
  constructor(props) {
    super(props);

    this.handleGNChange = this.handleGNChange.bind(this);
    this.handleWNChange = this.handleWNChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleStartBPMChange = this.handleStartBPMChange.bind(this);
    this.handleLiftChange = this.handleLiftChange.bind(this);
    this.handleHSChange = this.handleHSChange.bind(this);
    this.handleNormalChange = this.handleNormalChange.bind(this);
  }
  handleLiftChange(event) {
    let liftevent = event.target.value;
    let lifty = (liftevent/1000) * 320;
    lifty *= -1;
    this.props.dispatch(rs.setLaneY(lifty));
    this.props.dispatch(rs.setLift(event.target.value));
  }


  handleWNChange(event) {
    let whiteevent = event.target.value;
    let whitey = (whiteevent/1000) * 320;
    whitey *= 1;
    whitey -= 320;
    this.props.dispatch(rs.setWhite(whiteevent));
    this.props.dispatch(rs.setY(whitey));
  }

  handleBPMChange(event) {
    this.props.dispatch(rs.setBpm(event.target.value));
  }

  handleGNChange(event) {
    if(!this.props.normal) {
    this.props.dispatch(rs.setGreen(event.target.value));
    }
  }

  handleStartBPMChange(event) {
    this.props.dispatch(rs.setStartBpm(event.target.value));
  }
  handleHSChange(event) {
    if (this.props.normal) {
    this.props.dispatch(rs.setHS(event.target.value));
    }
  }
  handleNormalChange(event) {
    if (this.props.normal) {
      this.props.dispatch(rs.setNormal(false));
    } else {
    this.props.dispatch(rs.setNormal(true));
    }
  }

  render() {
    let noscroll
    if(this.props.noscroll) {
      noscroll = 'noScroll'
      //adds the class noScroll only if a mobile user is using a touchscreen to control the sudden plus component to prevent the whole browser from moving.
    } else {
      noscroll = ""
      //turns off noScroll only when a mobile user has finished setting their sudden plus position.
    }
    return (

      <div className={`wrapper ${noscroll}`}>
        <div className="header">
        <h1 className="title">SUD+ Floating Speed Calculator</h1>
        </div>
        <div className="box">
            <label>
            WN:
            </label>
            <br></br>
              <input type="text" className="sud" value={this.props.white} onChange={this.handleWNChange} />
            <br></br>
            <label>
            GN:
            </label>
            <br></br>
              <input type="text" className="ans" value={this.props.green} onChange={this.handleGNChange} />
            <br></br>
            <label>
            Lift:
            </label>
            <br></br>
            <input type="text" className="sud" value={this.props.lift} onChange={this.handleLiftChange} />
            <br></br>
            <label>
            BPM:
            </label>
            <br></br>
              <input type="text" className="sud" value={this.props.bpm} onChange={this.handleBPMChange} />
            <br></br>
            <label>
            Starting BPM:
            </label>
            <br></br>
              <input type="text" className="sud" value={this.props.startbpm} onChange={this.handleStartBPMChange} />
            <br></br>
            <label>
            HS:
            </label>
            <br></br>
              <input type="text" className="sud" value={this.props.hs} onChange={this.handleHSChange} />
            <br></br>
            <label>
            Normal Mode
            </label>
            <input type="checkbox" checked={this.props.normal} onChange={this.handleNormalChange} />
            <HS />
        </div>

        <div className="lane_hide"></div>
        <SuddenPlus></SuddenPlus>
        <div className="lane_all" 
        style={{
        position: 'absolute',
        top: this.props.laney
        }}></div>
        <div className="lane_lift"></div> 
        {//lane_lift is a hidden black div that is layered under all other divs. it is only visible when lane_all is moved thus giving it the same in-game look.
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => (
  {
    green: store.green,
    white: store.white,
    bpm: store.bpm,
    startbpm: store.startbpm,
    lift: store.lift,
    y: store.y,
    laney: store.laney,
    hs: store.hs,
    normal:store.normal,
    noscroll: store.noscroll
  }
)
export default connect(mapStateToProps)(Green);