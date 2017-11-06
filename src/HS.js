import React, { Component } from 'react';
import { connect } from "react-redux"
import * as rs from './actiontypes.js';

//This part handles all of the calculations involved with calculating either the HS and starting bpm green numbers or a user's green number if normal mode is checked.

class HS extends Component {
  constructor(props) {
    super(props);
    this.state = {greentwo: 0};
  }

  componentWillReceiveProps(nextProps) {
    let green = this.props.green;
    let white = this.props.white;
    let bpm = this.props.bpm;
    let startbpm = this.props.startbpm
    let lift = this.props.lift;
    let hs = this.props.hs;

      if (this.props.green !== nextProps.green) {
        green= nextProps.green;
      }
      if (this.props.white !== nextProps.white) {
        white = nextProps.white;
      }
      if (this.props.bpm !== nextProps.bpm) {
        bpm = nextProps.bpm;
      }
      if(this.props.startbpm !== nextProps.startbpm) {
        startbpm= nextProps.startbpm;
      }
      if(this.props.lift !== nextProps.lift) {
        lift= nextProps.lift;
      }
      if(this.props.hs !== nextProps.hss) {
        hs= nextProps.hs;
      }

    if(this.props.normal) {
    let speed = bpm * hs * (1000/(1000-white-lift));   
    let greennorm = 174000/speed;
    greennorm = greennorm.toFixed(2);
    this.props.dispatch(rs.setGreen(greennorm));

    } else {
    //We have to do some Algebra here because we want to calculate HS part that is missing from 174000/(bpm * hs * (1000/(1000 - white - lift))) if we want to get a user's proper FHS.
    let calc1 = 174000 / green;
    let calc2 = bpm * (1000/(1000-white-lift));
    let calc3 = calc1 / calc2;
    calc3 = calc3.toFixed(2);
    //I decided against rounding this value for now to do comparisons on how IIDX rounds these values in game. It is not clear what the game prioritizes when calculating FHS for players.
    this.props.dispatch(rs.setHS(calc3));

    let speed = startbpm * hs * (1000/(1000-white-lift));   
    let greentwo = 174000/speed;
    greentwo = greentwo.toFixed(2);

    //I've set this to 2 decimal points to let people have an idea how IIDX rounds these values in game.

    if(isNaN(greentwo)) { greentwo = 0};
    
    this.setState({gntwo: greentwo});
    }
  }

  render() {
    return (
      <div>
        <p>GN for Starting BPM: {this.state.gntwo} </p>
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
    normal:store.normal
  }
)
export default connect(mapStateToProps)(HS);