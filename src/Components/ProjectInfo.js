import React, { Component } from 'react';
import styled from 'styled-components';
import { alert } from './avatars.js';

// const googleMapsApiKey = `AIzaSyBfxtILkIqiz2_jVj9PjbvUQYJpJI9jzv0`;

const ProgressBar = styled.div`
width: ${(props) => props.completionStatus + "%"};
height: 10px;
background-color: rgba(0, 231, 255, 0.5);
`
const OuterProgressBar = styled.div`
width: 100%;
background-color: rgba(100, 100, 100, 0.5);
`

const Alert = styled.div`
width: 100%;
display: -webkit-box;
text-overflow: ellipsis;
`

const AlertImage = styled.img`
width: 50px;
height: 50px;
`

const Wrapper = styled.div`
`

class ProjectInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    // const streetViewPanoramaOptions = {
    //   position: { lat: this.props.object.geoLocation.lat, lng: this.props.object.geoLocation.lng },
    //   pov: { heading: 100, pitch: 0 },
    //   zoom: 1
    // }

    return (

      <Wrapper>

          <h2>{this.props.object.projectNumber}</h2>
          <h2>{this.props.object.projectTitle}</h2>
          <p>{this.props.object.projectDescription}</p>
          <p>Project Completion: {this.props.object.completionStatus}%</p>
          <OuterProgressBar>
            <ProgressBar completionStatus={this.props.object.completionStatus} />
          </OuterProgressBar>
          {this.props.object.alert ? (<Alert><AlertImage src={alert} alt="Alert" /><p>{this.props.object.alert}</p></Alert>) : false}


      </Wrapper>
    )
  }
}

export default ProjectInfo;