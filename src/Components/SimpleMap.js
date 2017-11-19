import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle.js';
import ProjectInfo from './ProjectInfo.js';
import CreateProject from './CreateProject.js';
import PinThumbnail, { HOUSE_SIZE } from './PinThumbnail.js';
import ListThumbnail from './ListThumbnail.js';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { _returnImage } from './avatars.js';
import styled from 'styled-components';
import Scrolling from './Scrolling.js'
import UserThumbnail from './UserThumbnail.js'
import { calculateProgressStatus } from './backend.js';

const API_KEY = 'AIzaSyBfxtILkIqiz2_jVj9PjbvUQYJpJI9jzv0'

// There should be a separate branch in the database for checklists/completion list
// Image is based off completion status

const darkGreen = "#24282b";
// const green = "#4d6059";
const lightGreen = "#7f8d89";

const TestDiv = styled.div`
position: absolute;
min-width: ${(props) => props.isSelected || props.creatingProject ? `60vw` : `0`};
top: 10vh;
left: 10vh;
z-index: 100000;
height: 80vh;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
border-radius: 10px;
-webkit-transition: 0.5s;
}
`

const TestDivLeft = styled.div`
min-width: 20vw; 
`

const TestDivRight = styled.div`
color: white;
min-width:100%;
width:100%;
max-width: 100%;
position:absolute;
-webkit-transition: 0.5s;
display: flex;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
    *:focus {
    outline: none;}
`

const ProjectsList = styled.div`
position: relative;
    overflow: scroll;
    height: 75%;

&::-webkit-scrollbar { 
    display: none; 
}
`

const TestDivRightWrapper = styled.div`
`

const UserProfile = styled.div`
background-color: ${ (props) => props.loginId === "Grace" ? "#ffffff" : "#00000"};
`

const NewProject = styled.button`
    color: ${(props) => props.creatingNewProject ? `${darkGreen}` : "white"};
    font-size: .8em;
    margin: 2em;
    width: 150px;
    height: 20px;
    background-color: ${(props) => props.creatingNewProject ? `white` : `${lightGreen}`};
    padding: 0.25em 1em;
    border: none;
    border-radius: 20px;
    -webkit-filter: ${(props) => props.creatingNewProject ? "drop-shadow(0px 0px 12px rgba(0, 231, 255, 0.8))" : ""};
    -webkit-transition: 0.3s;


    &:hover{
        color: ${darkGreen};
        background-color: white;
        -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 231, 255, 0.8));

    }

    &:active {
        color: white;
        background-color: ${darkGreen};
        }
`

const Title = styled.p`
padding: 0 1em;
text-align: left;
font-size: .9em;
margin: .5em;
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
        this.setState({ selectedObject: object, creatingProject: false, newAddress: null });
    }

    _onClickClear = () => {
        this.setState({ selectedObject: false, creatingProject: false, newAddress: null });
    }

    _handleCreateNewProject = (event) => {
        event.preventDefault();
        this.setState({ selectedObject: false, creatingProject: true, newAddress: null });
    }



    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            hoveringObject: false,
            selectedObject: false,
            creatingProject: false,
            offsetAmount: "",
            newAddress: false,
        };
    }

    _bounds = (object) => {
        this.setState({ offsetAmount: (object.bounds.nw.lng - object.bounds.se.lng) * .3 })
    }

    _handleNewAddress = (lat, lng) => {
        this.setState({
            newAddress: {
                lat: lat,
                lng: lng,
            }
        })
    }

    _calculateProgressStatus = (project) => {
        const progress = Object.keys(project.completionStatus).map(p => project.completionStatus[p])
        const comparedLengths = progress.filter(p => p).length / progress.length
        return comparedLengths * 100
    }

    render() {
        return (
            <Wrapper>
                <TestDiv zIndex="10000000" isSelected={this.state.selectedObject}>
                    <TestDivLeft>
                        <UserThumbnail user={this.props.user} handleLogout={this.props.handleLogout} />
                        <Title>Current projects...</Title>
                        <ProjectsList>
                            {this.props.objects.length > 1 ?
                                <Scrolling>
                                    {this.props.objects.map(object => {
                                        console.log(this._calculateProgressStatus(object) * 100)
                                        return (
                                            <ListThumbnail
                                                projectNumber={object.id}
                                                projectTitle={object.name}
                                                projectDescription={object.description}
                                                address={object.address}
                                                completionStatus={this._calculateProgressStatus(object)}
                                                lat={object.coords.lat}
                                                lng={object.coords.lng}
                                                alert={object.notes}
                                                zIndex={Math.floor(1 / object.coords.lat * 1000000)}
                                                image={_returnImage(this._calculateProgressStatus(object))}
                                                key={object.id}
                                                onMouseEnter={() => this._onMouseEnterObject(object.id)}
                                                isHovering={this.state.hoveringObject === object.id}
                                                onClick={() => this._onClick(object)}
                                                isSelected={this.state.selectedObject.id === object.id}
                                            />
                                        )
                                    })}
                                </Scrolling>
                                :
                                false
                            }
                        </ProjectsList>
                        <NewProject onClick={this._handleCreateNewProject} creatingNewProject={this.state.creatingProject}>
                            + NEW PROJECT
                        </NewProject>
                    </TestDivLeft>
                    <TestDivRightWrapper>
                    <TestDivRight isSelected={this.state.selectedObject} creatingProject={this.state.creatingProject}>
                        {this.state.selectedObject ? <ProjectInfo object={this.state.selectedObject} completionStatus={this._calculateProgressStatus(this.state.selectedObject)} /> : false}
                        {this.state.creatingProject ? <CreateProject handleNewAddress={this._handleNewAddress} user={this.props.user} /> : false}
                    </TestDivRight>
                    </TestDivRightWrapper>
                </TestDiv>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    center={this.state.newAddress ? { lat: this.state.newAddress.lat, lng: this.state.newAddress.lng + this.state.offsetAmount } : this.state.selectedObject ? { lat: this.state.selectedObject.coords.lat, lng: this.state.selectedObject.coords.lng + this.state.offsetAmount } : null}
                    bootstrapURLKeys={{
                        key: API_KEY,
                    }}
                    options={mapStyle}
                    hoverDistance={HOUSE_SIZE}
                    distanceToMouse={this._distanceToMouse}
                    onClick={this._onClickClear}
                    onChildMouseLeave={this._onMouseLeaveObject}
                    onChange={this._bounds}
                >
                    {this.props.objects.map(object => {
                        return (

                            <PinThumbnail
                                projectNumber={object.id}
                                projectTitle={object.name}
                                projectDescription={object.description}
                                address={object.address}
                                completionStatus={this._calculateProgressStatus(object)}
                                lat={object.coords.lat}
                                lng={object.coords.lng}
                                alert={object.alert}
                                zIndex={Math.floor(1 / object.coords.lat * 1000000)}
                                image={_returnImage(this._calculateProgressStatus(object))}
                                key={object.id}
                                onMouseEnter={() => this._onMouseEnterObject(object.id)}
                                onMouseLeave={this._onMouseLeaveObject}
                                isHovering={this.state.hoveringObject === object.id}
                                onClick={() => this._onClick(object)}
                                isSelected={this.state.selectedObject.id === object.id}
                            />
                        )
                    })}
                </GoogleMapReact>
            </Wrapper>
        );
    }
}

export default SimpleMap;