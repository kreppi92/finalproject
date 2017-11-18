import React, { Component } from 'react';
import styled from 'styled-components';

const HEIGHT = 125;

const Pin = styled.div`
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 16px;
    transform: translate(-50%, -50%);
    position: relative;
    z-index:
    width: ${HEIGHT};
    height: ${HEIGHT};
    -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 231, 255, 0.8));
    -webkit-transition: 0.3s;
    cursor: pointer;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

class Cone extends Component {

    render() {
        return (
            <Cone cone={this.props.cone}>
                <Image src={this.props.image} alt="" />
            </Cone>
        )
    }
}
export default Cone;
