import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import SimpleMap from './SimpleMap.js'

const Wrapper = styled.div`
      width: 100vw;
      height: 100vh;
      background-color: grey;
`;

const objects = [{
    projectNumber: 'MTL1234',
    projectTitle: 'Downtown House Reno',
    projectDescription: 'Full description of the project. Lorem ipsum.',
    address: '123 Fake St',
    geoLocation: {
        lat: 45.5067,
        lng: -73.5613,
    },
    completionStatus: 95,
    alert: "Unsold for 65 days. Next time consider Toronto's real estate market.",
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
}
]


class ProjectsOverview extends Component {
    render() {
        return (
            <Wrapper>
                <SimpleMap objects={objects} setHover={this._setHover}/>
            </Wrapper>
        )
    }
}

export default ProjectsOverview;