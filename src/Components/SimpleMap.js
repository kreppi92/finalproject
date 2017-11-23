import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle.js';
import ProjectInfo from './ProjectInfo.js';
import CreateProject from './CreateProject.js';
import PinThumbnail, { HOUSE_SIZE } from './PinThumbnail.js';
import ListThumbnail from './ListThumbnail.js';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { _returnImage, search, cancel } from './avatars.js';
import SearchBar from './Search.js'
import styled from 'styled-components';
import Scrolling from './Scrolling.js'
import UserThumbnail from './UserThumbnail.js'
import moment from 'moment';

const API_KEY = 'AIzaSyBfxtILkIqiz2_jVj9PjbvUQYJpJI9jzv0'

// There should be a separate branch in the database for checklists/completion list
// Image is based off completion status

const darkGreen = "#24282b";
// const green = "#4d6059";
const lightGreen = "#7f8d89";

const TestDiv = styled.div`
position: absolute;
min-width: ${(props) => props.isSelected || props.creatingProject || props.justCreated ? `60vw` : `0`};
top: 10vh;
left: 10vh;
z-index: 100000;
height: 80vh;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
border-radius: 10px;
-webkit-transition: 1s;

}
`

const TestDivLeft = styled.div`
min-width: 20vw; 
`

const TestDivRight = styled.div`
width: 100%;
height: 100%;
position: absolute;
white-space: nowrap;
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
    height: 80%;

&::-webkit-scrollbar { 
    display: none; 
}
`

const TestDivRightWrapper = styled.div`
width: 100%;
position: relative;
`

const NewProject = styled.button`
    color: ${(props) => props.creatingProject ? `${darkGreen}` : "white"};
    font-size: .8em;
    width: 150px;
    height: 20px;
    background-color: ${(props) => props.creatingProject ? `white` : `${lightGreen}`};
    padding: 0.25em 1em;
    border: none;
    border-radius: 20px;
    -webkit-filter: ${(props) => props.creatingProject ? "drop-shadow(0px 0px 12px rgba(0, 231, 255, 0.8))" : ""};
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

const NewProjectDiv = styled.div`
height: 10%;
display: flex;
align-items: center;
justify-content: center;
`

const Title = styled.div`
height: 5%;
padding: 0px 5px;
display: flex;
align-items: left;
justify-content: center;
text-align: left;
`

const SearchFormDiv = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
opacity: .8;
padding: 0px 5px;
`

const SearchFormButton = styled.div`
width: 25px;
padding: 3px;
display: flex;
align-items: center;
justify-content: center;
`

const SearchFrom = styled.form`
width: 100%;
height: 100%;
padding: 3px;
display: flex;
align-items: center;
justify-content: center;
padding: 0px;
`

const SearchClearButtons = styled.button`
    color: ${darkGreen};
    font-size: .8em;
    width: 22px;
    height: 22px;
    background-color: ${lightGreen};
    padding: 0px 0.25em;
    border: 2px;
    border-color: rgba(255,255,255,.8);
    border-radius: 50%;
    -webkit-transition: 0.3s;
    display: flex;
  align-items: center;
  justify-content: center;

    &:hover{
        color: ${darkGreen};
        background-color: white;

    }

    &:active {
        color: white;
        background-color: ${darkGreen};
        }
`


const SearchImages = styled.img`
width: 15px;
height: 15px;
`

const SearchButtons = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
`

class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 45.5017, lng: -73.6673 },
        zoom: 12
    };

    _setSelected = async (newObject) => {
        const index = this.props.objects.findIndex(object => object.id === newObject.id);
        this.setState({
            selectedObject: newObject,
            selectedObjectIndex: index,
            creatingProject: false,
            justCreated: true,
        })
        setTimeout(() => this.setState({ justCreated: false }), 4000)
    }

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

    _onClick = (i) => {
        this.setState({ selectedObject: this.props.objects[i], selectedObjectIndex: i, creatingProject: false, newAddress: null })
    }

    _onClickClear = () => {
        this.setState({ selectedObject: false, creatingProject: false, newAddress: null });
    }

    _handleCreateNewProject = (event) => {
        event.preventDefault();
        this.setState({ selectedObject: false, creatingProject: true, newAddress: null });
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedObject !== false) {
            this.setState({ selectedObject: nextProps.objects[this.state.selectedObjectIndex] });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            hoveringObject: false,
            selectedObject: false,
            creatingProject: false,
            offsetAmount: "",
            newAddress: false,
            selectedObjectIndex: 0,
            justCreated: false,
            isSearching: false,
            searchText: "",
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
        return Math.floor(comparedLengths * 100)
    }

    _calculateIsOnTime = () => {
        const completionStatus = this._calculateProgressStatus(this.state.selectedObject)
        const start = moment(this.state.selectedObject.startDate).unix()
        const end = moment(this.state.selectedObject.endDate).unix()
        const current = moment().unix()
        const comparedTimes = Math.floor(((end - current) / (end - start)) * 100)
        return (current > start && current < end) ? (completionStatus >= comparedTimes) : !(current > end && completionStatus < 100)
    }

    _renderThumbnails = () => {
        return this.props.objects.map((object, i) => {
            if (object.id) {
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
                        onClick={() => this._onClick(i)}
                        isSelected={this.state.selectedObject && this.state.selectedObject.id === object.id}
                        updateProjects={this.props.updateProjects}
                    />
                )
            }
            return null;
        });
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchFunction()
    }

    _handleClear = (e) => {
        e.preventDefault();
        this.setState({
            selectedObject: false,
            selectedObjectIndex: 0,
        })
        this.props.clearSearch()
    }

    render() {
        return (
            <Wrapper>
                <TestDiv zIndex="10000000" isSelected={this.state.selectedObject} creatingProject={this.state.creatingProject} justCreated={this.state.justCreated}>
                    <TestDivLeft>
                        <UserThumbnail user={this.props.user} handleLogout={this.props.handleLogout} />
                        <Title>
                            <SearchFrom type="submit" onSubmit={this._handleSubmit}>
                                <SearchFormDiv>
                                    <input type="text" value={this.props.searchText} onChange={(e) => this.props.searchInput(e)} placeholder="Search for projects..." />
                                </SearchFormDiv>
                                <SearchButtons>
                                    <SearchFormButton>
                                        <SearchClearButtons>
                                            <SearchImages src={search} alt="Search" />
                                        </SearchClearButtons>
                                    </SearchFormButton>
                                    <SearchFormButton>
                                        <SearchClearButtons onClick={this._handleClear}>
                                            <SearchImages src={cancel} alt="cancel" />
                                        </SearchClearButtons>
                                    </SearchFormButton>
                                </SearchButtons>
                            </SearchFrom>
                        </Title>
                        <ProjectsList>
                            {this.props.objects.length > 1 ? (
                                <Scrolling selectedIndex={this.state.selectedObjectIndex} snap={75}>
                                    {this._renderThumbnails()}
                                </Scrolling>)
                                :
                                <div>{this._renderThumbnails()}</div>
                            }
                        </ProjectsList>
                        <NewProjectDiv>
                            <NewProject onClick={this._handleCreateNewProject} creatingProject={this.state.creatingProject} >
                                + NEW PROJECT
                            </NewProject>
                        </NewProjectDiv>
                    </TestDivLeft>
                    <TestDivRightWrapper>
                        <TestDivRight isSelected={this.state.selectedObject} creatingProject={this.state.creatingProject}>
                            {this.state.selectedObject && !this.state.creatingProject && !this.state.justCreated ? <ProjectInfo
                                object={this.state.selectedObject}
                                completionStatus={this._calculateProgressStatus(this.state.selectedObject)}
                                userID={this.props.user.id}
                                updateProjects={this.props.updateProjects}
                                isOnTime={this._calculateIsOnTime()}
                            /> : false}
                            {this.state.creatingProject || this.state.justCreated ? <CreateProject handleNewAddress={this._handleNewAddress} user={this.props.user} updateProjects={this.props.updateProjects} setSelected={this._setSelected} justCreated={this.state.justCreated} /> : false}
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
                    {this.props.objects.map((object, i) => {
                        if (object.id) {
                            return (
                                <PinThumbnail
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
                                    onMouseLeave={this._onMouseLeaveObject}
                                    isHovering={this.state.hoveringObject === object.id}
                                    onClick={() => this._onClick(i)}
                                    isSelected={this.state.selectedObject.id === object.id}
                                    updateProjects={this.props.updateProjects}

                                />
                            )
                        } return null
                    })}
                </GoogleMapReact>
            </Wrapper>
        );
    }
}

export default SimpleMap;