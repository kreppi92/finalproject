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
height: 100%;
display: flex;
flex-direction: column;
`

const Checklist = styled.div`
    box-sizing: border-box;
    padding: 0px 13px 20px 13px;
    flex: 1;

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
width: 100%;
position: absolute;
display: float;
opacity: .3;
`

const WeatherAppTemp = styled.div`
position: absolute;
font-size: 3em;
top: 0;
left: 0;
padding: 10px;
`

const WeatherAppIcon = styled.div`
position: absolute;
width: 300px;
opacity: 0.4;
top: 0;
left: 0;
`

const WeatherAppDate = styled.div`
position: absolute;
font-size: 3em;
top: 0;
right: 0;
text-align: right;
padding: 10px;
`

class ProjectInfo extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment().format('LT'),
    }
  }

  _handleCheckbox = (task) => {
    updateProject2(this.props.userID, this.props.object.id, task)
    this.props.updateProjects();
  }

  componentWillReceiveProps() {
  }

  componentDidMount() {
    weatherApp2({ lat: this.props.object.coords.lat, lng: this.props.object.coords.lng })
      .then(data => this.setState({ currentWeather: data }));
    this.interval = setInterval(()=>this.setState({currentTime: moment().format('LT')}) ,10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
            <WeatherAppDate>
              <div>{moment().format(`MMM D`)}</div>
              <div>{this.state.currentTime}</div>
            </WeatherAppDate>
        </WeatherApp>
        <div>
        <h2>{this.props.object.id}</h2>
        <h2>{this.props.object.name}</h2>
        <p>{this.props.object.description}</p>
        <p>{this.props.object.address}</p>
        <p>Start Date: {moment(this.props.object.startDate).format('L')} - End Date: {moment(this.props.object.endDate).format('L')}</p>
        <p>Project Completion: {this.props.completionStatus}% - Schedule: {this.props.isOnTime ? "On schedule" : "Behind schedule"}</p>
        <OuterProgressBar>
          <ProgressBar completionStatus={this.props.completionStatus} isOnTime={this.props.isOnTime} />
        </OuterProgressBar>
        <AlertInfo alert={this.props.object.notes} userID={this.props.userID} projectID={this.props.object.id} updateProjects={this.props.updateProjects} />
        </div>
        <Checklist>
          {Object.keys(this.props.object.completionStatus).length > 1 ?
            <Scrolling>
              {Object.keys(this.props.object.completionStatus).map(x => (
                <CheckboxUnit key={x}>
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