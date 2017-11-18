import React, { Component } from 'react';
import styled from 'styled-components';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { alert } from './avatars.js'

const Thumbnail = styled.div`
min-width: 20vw; 
height: 75px;
background-color: ${(props) => props.isSelected ? "rgba(100,100,100,.5)" : props.isHovering ? "rgba(100,100,100,.5)" : "rgba(0,0,0,.5)"};
-webkit-filter: drop-shadow(${(props) => props.isSelected ? "0px 0px 12px rgba(0, 231, 255, 0.8)" : "0"});
-webkit-transition: 0.3s;
display: flex;
color: white;
cursor: pointer;
&:active{
    cursor: url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default;
}
`

const Avatar = styled.div`
min-width: 75px;
min-height: 75px;
position: relative;
`

const Description = styled.div`
width: 100%;
display: block;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`
const Image = styled.img`
width: 75px;
height: 75px;
`

const Title = styled.p`
font-size: 12px;
margins: 0;
text-align: left;
`

const ProjectDescription = styled.p`
font-size: 12px;
text-align: left;
`

const Alert = styled.div`
position: absolute;
display: float;
transform: translate(25%, 25%);
width: 25px;
height: 25px;
`

const AlertImage = styled.img`
position: absolute;
width: 100%;
height: 100%;
`

class ListThumbnail extends Component {
    // constructor(props) {
    //     super(props)
    // }

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Thumbnail onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} isHovering={this.props.isHovering} onClick={this.props.onClick} isSelected={this.props.isSelected}>
                <Avatar>
                    {this.props.alert? <Alert><AlertImage src={alert} alt="Alert"/></Alert> : false}
                    <Image src={this.props.image} alt={this.props.projectNumber} />
                </Avatar>
                    <Description>
                        <Title>{this.props.projectNumber}</Title>
                        <ProjectDescription>{this.props.projectTitle}</ProjectDescription>
                    </Description>
            </Thumbnail>
                )
    }
}

export default ListThumbnail;