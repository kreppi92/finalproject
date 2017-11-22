import React, { Component } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createProject } from './backend.js';
import shouldPureComponentUpdate from 'react-pure-render/function';
import moment from 'moment'

const darkGreen = "#24282b";
// const green = "#4d6059";
const lightGreen = "#7f8d89";

const Wrapper = styled.div`
display: block;
width: 40vw;
max-width: 40vw;
`

const Table = styled.table`
text-align: left;
width: 100%;
margins: 0 0px;
padding: 0 20px;
`

const Column1 = styled.td`
width: 30%
`

const Column2 = styled.td`
`

const Rows = styled.tr`
margins: 0;
`

const Header = styled.div`
display: flex;
align-items: center;
padding: 15px;
`

const NewProject = styled.button`
color: white;
font-size: .8em;
margin: 1em;
width: 200px;
height: 20px;
background-color: ${lightGreen};
padding: 0.25em 1em;
border: none;
border-radius: 20px;



&:hover{
    color: ${darkGreen};
    background-color: white;
    -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 231, 255, 0.8));
    -webkit-transition: 0.3s;
}

&:active {
    color: white;
    background-color: ${darkGreen};
    }
`


class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    shouldComponentUpdate = shouldPureComponentUpdate;


    handleStartChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleEndChange = (date) => {
        this.setState({
            endDate: date
        });
    }

    handleProjectName = () => {
        this.setState({
            projectName: this.projectName.value
        })
    }

    handleProjectDescription = () => {
        this.setState({
            projectDescription: this.projectDescription.value
        })
    }

    handleAddress = (address, lat, lng) => {
        this.props.handleNewAddress(lat, lng)
        this.setState({
            address: address,
            geoLocation: {
                lat: lat,
                lng: lng
            }
        })
    }
    // export async function createProject(userId, startDate, endDate, address, description, name) 
    _handleCreateNewProject = (event) => {
        event.preventDefault();
        createProject(this.props.user.id, this.state.startDate, this.state.endDate, this.state.address, this.state.projectDescription, this.state.projectName)
            .then(async data => {
                await this.props.updateProjects();
                this.setState({
                    newProjectID: data.id,
                    newProjectObject: data,
                });
                return data
            } )
            .then(data=>this.props.setSelected(data))
    }

    render() {
        return (
            <div>
                <Header>
                    <img src="https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/ConstructionWorker-01.png?alt=media&token=1c0b1450-e904-445f-bfb9-65f1b5fca074" alt="Create New Project" />
                    <h2>Create New Project</h2>
                </Header>

                <Wrapper>
                    {this.state.newProjectID ?
                        (
                            <div>
                                <h2>Project {this.state.newProjectID} has been created</h2>
                                <h3>{this.state.projectName}</h3>
                            </div>
                        )
                        :
                        (<div>
                            <form>
                                <Table>
                                    <tbody>
                                        <Rows>
                                            <Column1>
                                                <p>Project Number:</p>
                                            </Column1>
                                            <Column2>
                                                <p>Autogenerated</p>
                                            </Column2>
                                        </Rows>
                                        <Rows>
                                            <Column2>
                                                <p>Project Name:</p>
                                            </Column2>
                                            <Column2>
                                                <input onInput={this.handleProjectName} ref={r => this.projectName = r} value={this.state.projectName} />
                                            </Column2>
                                        </Rows>
                                        <Rows>
                                            <Column2>
                                                <p>Project Description:</p>
                                            </Column2>
                                            <Column2>
                                                <input onInput={this.handleProjectDescription} ref={r => this.projectDescription = r} value={this.state.projectDescription} />
                                            </Column2>
                                        </Rows>
                                        <Rows>
                                            <Column2>
                                                <p>Address:</p>
                                            </Column2>
                                            <Column2>
                                                <Autocomplete
                                                    style={{ width: '100%' }}
                                                    onPlaceSelected={(place) => {
                                                        this.handleAddress(place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng())
                                                    }}
                                                    types={[]}
                                                    componentRestrictions={{ country: "ca" }}
                                                    ref={r => this.address = r}
                                                    value={this.state.address}
                                                />
                                            </Column2>
                                        </Rows>
                                        <Rows>
                                            <Column2>
                                                <p>Start Date:</p>
                                            </Column2>
                                            <Column2>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleStartChange}
                                                    ref={r => this.startDate = r}
                                                    value={moment(this.state.startDate).format('L')}
                                                />
                                            </Column2>
                                        </Rows>
                                        <Rows>
                                            <Column2>
                                                <p>End Date:</p>
                                            </Column2>
                                            <Column2>
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    onChange={this.handleEndChange}
                                                    ref={r => this.endDate = r}
                                                    state={moment(this.state.endDate).format('L')}
                                                />
                                            </Column2>
                                        </Rows>
                                    </tbody>
                                </Table>

                                <NewProject onClick={this._handleCreateNewProject}>
                                    CREATE
                                </NewProject>
                            </form>
                        </div>)
                    }

                </Wrapper>
            </div>
        )
    }
}

export default CreateProject;