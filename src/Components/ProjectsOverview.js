import React, { Component } from 'react';
import styled from 'styled-components';
import SimpleMap from './SimpleMap.js'
import { initializeUserIfNeeded } from './backend.js'
import { getCurrentProjects } from './backend.js';


const Wrapper = styled.div`
      width: 100vw;
      height: 100vh;
      background-color: grey;
`;

const objects = [{
    projectNumber: 'MTL1234', //Id
    projectTitle: 'Downtown House Reno', //Name
    projectDescription: 'Full description of the project. Lorem ipsum.', // Description
    address: '123 Fake St', // Address
    geoLocation: { // Coords
        lat: 45.5067,
        lng: -73.5613,
    },
    completionStatus: 95, // NOT LOGGED, called on object return, saved as // status.progress * 100
    alert: "Unsold for 65 days. Next time consider Toronto's real estate market.", // Notes
},
{
    projectNumber: 'MTL123',
    projectTitle: 'Downtown House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Fake St',
    geoLocation: {
        lat: 45.5297,
        lng: -73.5613,
    },
    completionStatus: 55,
    alert: "",
},
{
    projectNumber: 'MTL1239',
    projectTitle: 'Laval House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Laval St',
    geoLocation: {
        lat: 45.5117,
        lng: -73.5983,
    },
    completionStatus: 75,
},
{
    projectNumber: 'MTL1219',
    projectTitle: 'Laval House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Laval St',
    geoLocation: {
        lat: 45.5317,
        lng: -73.5283,
    },
    completionStatus: 15,
    alert: "Building permit pending",
},
{
    projectNumber: 'MTL1269',
    projectTitle: 'Laval House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Laval St',
    geoLocation: {
        lat: 45.5117,
        lng: -73.6583,
    },
    completionStatus: 30,
    alert: "",
},
{
    projectNumber: 'MTL1209',
    projectTitle: 'Laval House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Laval St',
    geoLocation: {
        lat: 45.4817,
        lng: -73.5583,
    },
    completionStatus: 30,
    alert: "",
},
{
    projectNumber: 'MTL1109',
    projectTitle: 'Laval House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Laval St',
    geoLocation: {
        lat: 45.5817,
        lng: -73.5583,
    },
    completionStatus: 80,
    alert: "",
}
]


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
              coords: {lat: "", lng: ""},
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
    .then( objects => {
        console.log(objects)
        this.setState({
            objects: objects
        })
    }
    )
}

    render() {
        return (
            <Wrapper>
                {/* {this.props.isLoggedIn ?  */}
                <SimpleMap
                objects={this.state.objects}
                setHover={this._setHover}
                user={this.props.user}
                handleLogout={this.props.handleLogout}
                />
                {/* :<h2> Please login to view </h2>} */}
            </Wrapper>
        )
    }
}

export default ProjectsOverview;