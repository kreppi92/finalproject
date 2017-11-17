import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { alert } from './avatars.js'


const ProgressBar = styled.div`
width: ${(props) => props.completionStatus + "%"};
height: 10px;
background-color: rgba(0, 231, 255, 0.5);
`
const OuterProgressBar = styled.div`
width: 100%;
background-color: rgba(100, 100, 100, 0.5);
`

const Alert = styled.div`
width: 100%;
display: flex;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`

const AlertImage = styled.img`
width: 50px;
height: 50px;
`

const Wrapper = styled.div`
display: block;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`

class ProjectInfo extends Component {

constructor(props) {
  super(props);
  this.state= {}
}

    render() {
        return (
        
          <Wrapper>
            {this.props.object? 
                        (<div><h2>{this.props.object.projectNumber}</h2>
                        <h2>{this.props.object.projectTitle}</h2>
                        <p>{this.props.object.projectDescription}</p>
                        <p>Project Completion: {this.props.object.completionStatus}%</p>
                        <OuterProgressBar>
                        <ProgressBar completionStatus={this.props.object.completionStatus}/>
                        </OuterProgressBar>
                        {this.props.object.alert? (<Alert><AlertImage src={alert} alt="Alert"/><p>{this.props.object.alert}</p></Alert>) : false}
                        </div>
                      )
          : false }

          </Wrapper>
        )
      }
    }

export default ProjectInfo;