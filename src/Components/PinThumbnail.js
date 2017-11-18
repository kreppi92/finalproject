import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { alert } from './avatars.js'

const HOUSE_SIZE = 75;
const HOVER_HEIGHT = 175;
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
    z-index: ${(props) => props.isSelected? 100000 : props.$hover || props.isHovering ? 99999 : props.zIndex};
    width: ${(props) => props.$hover || props.isHovering || props.isSelected ? HOVER_HEIGHT : HEIGHT}px;
    height: ${(props) => props.$hover || props.isHovering || props.isSelected ? HOVER_HEIGHT : HEIGHT}px;
    -webkit-filter: drop-shadow(${(props) => props.isSelected || props.cone ? "0px 0px 12px rgba(0, 231, 255, 0.8)" : "0" });
    -webkit-transition: 0.3s;
    cursor: pointer;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const Alert = styled.div`
position: absolute;
transform: translate(100%, 100%);
width: 25px;
height: 25px;
display: float;
`

const AlertImage = styled.img`
width: 100%;
height: 100%;
`


class PinThumbnail extends Component {

    static propTypes = {
        $hover: PropTypes.bool,
        text: PropTypes.string,
        zIndex: PropTypes.number
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidUpdate() {
        if (this.props.$hover) this.props.onMouseEnter();
    }

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Pin $hover={this.props.$hover} zIndex={this.props.zIndex} isHovering={this.props.isHovering} onMouseLeave={this.props.onMouseLeave} onClick={this.props.onClick} isSelected={this.props.isSelected} cone={this.props.cone}>
                {this.props.alert? <Alert><AlertImage src={alert} alt="Alert"/></Alert> : false}
                <Image src={this.props.image} alt="" />
            </Pin>
        )
    }
}
export { HOUSE_SIZE };
export default PinThumbnail;
