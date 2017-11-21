import React, { PureComponent } from 'react';
import styled from 'styled-components';
import AlertInfo from './AlertInfo.js'
import Scrolling from './Scrolling.js'
import { weatherApp2, updateProject2 } from './backend.js'
import Skycons from 'react-skycons'
import moment from 'moment';

// const googleMapsApiKey = `AIzaSyBfxtILkIqiz2_jVj9PjbvUQYJpJI9jzv0`;

const ProgressBar = styled.div`
width: ${(props) => props.completionStatus + "%"};
height: 10px;
background-color: ${(props) => props.isOnTime ? "rgba(0, 231, 255, 0.5)" : "rgba(255, 0, 0, 0.5)"};
`
const OuterProgressBar = styled.div`
width: 100%;
background-color: rgba(100, 100, 100, 0.5);
`

const Wrapper = styled.div`
display: block;
width: 40vw;
max-width: 40vw;
`

const Checklist = styled.div`
    position: absolute;
    overflow: scroll;
    height: 100%;
    width: 40vw;

&::-webkit-scrollbar { 
    display: none; 
}
`

const CheckboxUnit = styled.div`
display: flex;
`

const CheckboxUnitCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`

const CheckboxUnitKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherApp = styled.div`
position: absolute;
display: float;
opacity: .4;
transform: translate(10%, 10%);
`

const WeatherAppTemp = styled.div`
position: absolute;
display: float;
font-size: 3em;
`

const WeatherAppIcon = styled.div`
position: absolute;
display: float;
width: 300px;
transform: translate(-10%, -20%);
opacity: 0.4
`

class ProjectInfo extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _handleCheckbox = (task) => {
    updateProject2(this.props.userID, this.props.object.id, task)
    this.props.updateProjects()
  }

  componentWillReceiveProps() {
  }

  componentDidMount() {
    weatherApp2({ lat: this.props.object.coords.lat, lng: this.props.object.coords.lng })
    .then(data => this.setState({ currentWeather: data }))
  }

  render() {
    return (
      <Wrapper>
        <WeatherApp>
          {this.state.currentWeather ?
            <WeatherAppTemp>
              {Math.floor(this.state.currentWeather.currently.temperature)}°C
            </WeatherAppTemp>
            :
            false}
          {this.state.currentWeather ?
            <WeatherAppIcon>
              <Skycons
                color='white'
                icon={this.state.currentWeather.currently.icon.toUpperCase().replace(/-/g, "_")}
                autoplay={true}
              />
            </WeatherAppIcon>
            : false}
        </WeatherApp>
        <h2>{this.props.object.id}</h2>
        <h2>{this.props.object.name}</h2>
        <p>{this.props.object.description}</p>
        <p>{this.props.object.address}</p>
        <p>Start Date: {moment(this.props.object.startDate).format('L')} - End Date: {moment(this.props.object.endDate).format('L')}</p>
        <p>Project Completion: {this.props.completionStatus}% - On Time: {this.props.isOnTime ? "On schedule" : "Behind schedule"}</p>
        <OuterProgressBar>
          <ProgressBar completionStatus={this.props.completionStatus} isOnTime={this.props.isOnTime} />
        </OuterProgressBar>
        <AlertInfo alert={this.props.object.notes} userID={this.props.userID} projectID={this.props.object.id} updateProjects={this.props.updateProjects} />
        <Checklist>
          {Object.keys(this.props.object.completionStatus).length > 1 ?
            <Scrolling>
              {Object.keys(this.props.object.completionStatus).map(x => (
                <CheckboxUnit>
                  <CheckboxUnitCheck>
                    <input type="checkbox" checked={this.props.object.completionStatus[x] ? "checked" : ""} key={x} ref={r => this.x = r} onChange={() => this._handleCheckbox(x)} />
                  </CheckboxUnitCheck>
                  <CheckboxUnitKey>
                    {x}
                  </CheckboxUnitKey>
                </CheckboxUnit>)
              )}
            </Scrolling>
            :
            false
          }

        </Checklist>
      </Wrapper>
    )
  }
}

export default ProjectInfo;