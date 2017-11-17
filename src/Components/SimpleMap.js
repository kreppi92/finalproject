import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle.js';
import ProjectInfo from './ProjectInfo.js';
import PinThumbnail, { HOUSE_SIZE } from './PinThumbnail.js';
import ListThumbnail from './ListThumbnail.js';
import shouldPureComponentUpdate from 'react-pure-render/function';
import avatars, { _returnImage, alert } from './avatars.js';
import styled, { css } from 'styled-components';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const API_KEY = 'AIzaSyBfxtILkIqiz2_jVj9PjbvUQYJpJI9jzv0'

// There should be a separate branch in the database for checklists/completion list
// Image is based off completion status


const TestDiv = styled.div`
position: absolute;
top: 10vh;
left: 10vh;
z-index: 100000;
min-width: 300px;
width: ${(props) => props.isSelected ? `60vw` : `20vw`};
height: 80vh;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
border-radius: 10px;
-webkit-transition: 0.5s;
}
`

const TestDivLeft = styled.div`
`

const TestDivRight = styled.div`
color: white;
width: 100%;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
`

class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 45.5017, lng: -73.6673 },
        zoom: 12
    };


    _distanceToMouse = (markerPos, mousePos, markerProps) => {
        const x = markerPos.x;
        const y = markerPos.y;
        const distanceCoef = 2;
        return distanceCoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
    }

    _onMouseEnterObject = (projectNumber) => {
        this.setState({ hoveringObject: projectNumber });
    }

    _onMouseLeaveObject = () => {
        this.setState({ hoveringObject: false });
    }

    _onClick = (object) => {
        this.setState({ selectedObject: object });
    }

    _onClickClear = () => {
        this.setState({ selectedObject: false });
    }


    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            hoveringObject: false,
            selectedObject: false,
        };
    }

    render() {
        return (
            <Wrapper>
                <TestDiv zIndex="10000000" isSelected={this.state.selectedObject}>
                    <TestDivLeft>
                        <h3>Current projects...</h3>
                        {this.props.objects.map(object => {
                            return (
                                <ListThumbnail
                                    projectNumber={object.projectNumber}
                                    projectTitle={object.projectTitle}
                                    projectDescription={object.projectDescription}
                                    address={object.address}
                                    completionStatus={object.completionStatus}
                                    lat={object.geoLocation.lat}
                                    lng={object.geoLocation.lng}
                                    alert={object.alert}
                                    zIndex={Math.floor(1 / object.geoLocation.lat * 1000000)}
                                    image={_returnImage(object.completionStatus)}
                                    key={object.projectNumber}
                                    onMouseEnter={() => this._onMouseEnterObject(object.projectNumber)}
                                    isHovering={this.state.hoveringObject === object.projectNumber}
                                    onClick={() => this._onClick(object)}
                                    isSelected={this.state.selectedObject.projectNumber === object.projectNumber}
                                />
                            )
                        })}
                    </TestDivLeft>
                    <TestDivRight>
                        <ProjectInfo object={this.state.selectedObject} />
                    </TestDivRight>
                </TestDiv>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    center={this.state.selectedObject ? { lat: this.state.selectedObject.geoLocation.lat, lng: this.state.selectedObject.geoLocation.lng - .15} : this.props.center}
                    bootstrapURLKeys={{
                        key: API_KEY,
                    }}
                    options={mapStyle}
                    hoverDistance={HOUSE_SIZE}
                    distanceToMouse={this._distanceToMouse}
                    onClick={this._onClickClear}
                    onChildMouseLeave={this._onMouseLeaveObject}
                >
                    {this.props.objects.map(object => {
                        return (
                            <PinThumbnail
                                projectNumber={object.projectNumber}
                                projectTitle={object.projectTitle}
                                projectDescription={object.projectDescription}
                                address={object.address}
                                completionStatus={object.completionStatus}
                                lat={object.geoLocation.lat}
                                lng={object.geoLocation.lng}
                                alert={object.alert}
                                zIndex={Math.floor(1 / object.geoLocation.lat * 1000000)}
                                image={_returnImage(object.completionStatus)}
                                key={object.projectNumber}
                                onMouseEnter={() => this._onMouseEnterObject(object.projectNumber)}
                                onMouseLeave={this._onMouseLeaveObject}
                                isHovering={this.state.hoveringObject === object.projectNumber}
                                onClick={() => this._onClick(object)}
                                isSelected={this.state.selectedObject.projectNumber === object.projectNumber}
                            />
                        )
                    })}

                </GoogleMapReact>
            </Wrapper>
        );
    }
}

export default SimpleMap;