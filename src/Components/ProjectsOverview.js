import React, { Component } from 'react';
import styled from 'styled-components';
import SimpleMap from './SimpleMap.js'
import { getCurrentProjects } from './backend.js';
import { Link } from 'react-router-dom';

const darkGreen = "#24282b";
// const green = "#4d6059";
// const lightGreen = "#7f8d89";

const Wrapper = styled.div`
background-color: ${darkGreen};
width: 100vw;
height: 100vh;
background-color: grey;
display: block;
justify-content: center;
align-items: center;
`;


class ProjectsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [{
                projectId: "",
                completionStatus: {},
                startDate: "",
                endDate: "",
                address: "",
                coords: { lat: "", lng: "" },
                description: "",
                name: "",
                current: true,
                cancelled: false,
                notes: ''
            }]
        }
    }

    componentWillMount() {
        getCurrentProjects(this.props.user.id)
            .then(objects => {
                this.setState({
                    objects: objects
                })
            }
            )
    }

    _updateProject = () => {
        getCurrentProjects(this.props.user.id)
            .then(objects => {
                this.setState({
                    objects: objects
                })
            }
            )
    }

    render() {
        return (
            <Wrapper>
                {/* {this.props.isLoggedIn ? */}
                    <SimpleMap
                        objects={this.state.objects}
                        setHover={this._setHover}
                        user={this.props.user}
                        handleLogout={this.props.handleLogout}
                        updateProjects={this._updateProject}
                    />
                     {/* : */}
                    {/* <Link to={"/"}><h2> Please login to view </h2></Link>} */}
            </Wrapper>
        )
    }
}

export default ProjectsOverview;