import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux"
import * as rs from './actiontypes.js';

//This part of the code handles the UI aspect for the cover/ sudden + modifier that users can interact with.

class SuddenPlus extends Component {
  constructor(props) {
    super(props);
    
      this.state = {relY: 0}
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.swiped = this.swiped.bind(this);
  }

  onTouchStart(e) {
    console.log(e.changedTouches[0].pageY);
    const ref = ReactDOM.findDOMNode(this.refs.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    const firstPageY = Object.assign([], e.changedTouches);
    let relY = firstPageY[0].pageY - (box.top + body.scrollTop - body.clientTop);
    this.setState({relY: relY});
    this.props.dispatch(rs.setNoScroll(true));
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchEnd(e) {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd); 
    this.props.dispatch(rs.setNoScroll(false));   
  }

  onTouchMove(e) {
    let ypos = e.changedTouches[0].pageY - this.state.relY;
    console.log(ypos);
    let laneypos = ypos + 320;
    let whitenew = Math.floor((laneypos/320)*1000);
    this.props.dispatch(rs.setY(ypos));
    this.props.dispatch(rs.setWhite(whitenew));
  }

  onMouseDown(e) {
    console.log(e);
    if (e.button !== 0) return;
    const ref = ReactDOM.findDOMNode(this.refs.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    this.setState({
      relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
      relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
    });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  }

  onMouseUp(e) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  }

  onMouseMove(e) {
    let ypos = e.pageY - this.state.relY;
    let laneypos = ypos + 320;
    let whitenew = Math.floor((laneypos/320)*1000);
    this.props.dispatch(rs.setY(ypos));
    this.props.dispatch(rs.setWhite(whitenew));
    e.preventDefault();
  }

  swiped() {
    console.log("Swiped")    
  }

  render() {
    return <div 
      className="lane_cover"
      onMouseDown={this.onMouseDown}
      onTouchStart={this.onTouchStart}
      style={{
        position: 'absolute',
        top: this.props.y,
      }}
      ref="handle"
></div>;
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
export default connect(mapStateToProps)(SuddenPlus);