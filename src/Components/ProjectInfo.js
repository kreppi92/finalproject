import React, { Component } from 'react';
import styled from 'styled-components';
import { alert } from './avatars.js';
import Scrolling from './Scrolling.js'

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
display: block;
width: 40vw;
max-width: 40vw;
`

const Checklist = styled.div`
display: block;
overflow: scroll;
width: 100%;

&::-webkit-scrollbar { 
display: none; 
}
`

const CheckboxUnit = styled.div`
display: flex
`

const CheckboxUnitCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
width: 30px;
height: 30px;
`

const CheckboxUnitKey = CheckboxUnitCheck.extend`
width: -webkit-fill-available;
`

class ProjectInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    // const streetViewPanoramaOptions = {
    //   position: { lat: this.props.object.geoLocation.lat, lng: this.props.object.geoLocation.lng },
    //   pov: { heading: 100, pitch: 0 },
    //   zoom: 1
    // }
    console.log("keys", Object.keys(this.props.object.completionStatus))
    return (

      <Wrapper>
        <h2>{this.props.object.id}</h2>
        <h2>{this.props.object.name}</h2>
        <p>{this.props.object.description}</p>
        <p>{this.props.object.address}</p>
        <p>Project Completion: {this.props.completionStatus}%</p>
        <OuterProgressBar>
          <ProgressBar completionStatus={this.props.completionStatus} />
        </OuterProgressBar>
        {this.props.object.notes ? (<Alert><AlertImage src={alert} alt="Alert" /><p>{this.props.object.notes}</p></Alert>) : false}
        <Scrolling>
        <Checklist>
            {Object.keys(this.props.object.completionStatus).map(key => (
            <CheckboxUnit>
              <CheckboxUnitCheck>
                <input type="checkbox" checked={this.props.object.completionStatus[key] ? "checked" : ""} />
              </CheckboxUnitCheck>
              <CheckboxUnitKey>
                {key}
              </CheckboxUnitKey>
            </CheckboxUnit>))}
        </Checklist>
        </Scrolling>
      </Wrapper>
    )
  }
}

export default ProjectInfo;