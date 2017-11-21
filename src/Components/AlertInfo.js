import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { alert } from './avatars.js';
import { editProjectNotes } from './backend.js'

const darkGreen = "#24282b";
// const green = "#4d6059";
const lightGreen = "#7f8d89";

const Alert = styled.div`
display: flex;
padding: 10px;
box-sizing: border-box;
width: 100%;
`

const AlertImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`

const AlertImage = styled.img`
filter: ${props => props.creatingAlert ? null : 'grayscale(100%)'};
width: 30px;
height: 30px;
`

const AddAlertDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 15%;
height: 30px;
`

const AddAlert = styled.button`
    color: ${(props) => props.creatingProject ? `${darkGreen}` : "white"};
    font-size: .8em;
    width: 100%;
    height: 20px;
    background-color: ${(props) => props.creatingProject ? `white` : `${lightGreen}`};
    padding: 0.25em;
    border: none;
    border-radius: 20px;
    -webkit-transition: 0.3s;

    &:hover{
        color: ${darkGreen};
        background-color: white;

    }

    &:active {
        color: white;
        background-color: ${darkGreen};
        }

`

const AlertDescription = styled.p`
display: flex;
align-items: center;
justify-content: left;
height: 30px;
width: -webkit-fill-available;
margin: 0;
padding: 0 1em;
`

const WrapAlerts = styled.div`
display: flex;
width: 85%
`

const Flex = styled.div`
display: flex;
width: 100%
`

class AlertInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            creatingAlert: false,
            alertDescription: "",
        }
    }

    _handleClick = async (event) => {
        event.preventDefault();
            if (this.state.alertDescription) {
            // export async function editProjectNotes(userId, projectId, inputText)
            await editProjectNotes(this.props.userID, this.props.projectID, this.state.alertDescription)
            await this.props.updateProjects()
            this.setState({ alertDescription: "", creatingAlert: false })
        } else {
            this.setState({ creatingAlert: !this.state.creatingAlert })
        }


    }

    _handleClear = async (event) => {
        event.preventDefault();
        await editProjectNotes(this.props.userID, this.props.projectID, "")
        this.setState({ alertDescription: "", creatingAlert: false })
        this.props.updateProjects()
    }

    _handleInput = () => {
        this.setState({ alertDescription: this.alertText.value})
    }

    render() {
        return (
            <Alert>
                {this.props.alert.length ?
                    (<WrapAlerts>
                        <AlertImageDiv>
                            <AlertImage src={alert} alt="Alert" creatingAlert={this.props.alert}/>
                        </AlertImageDiv>
                        <AlertDescription>
                            {this.props.alert}
                        </AlertDescription>
                    </WrapAlerts>)
                    :
                    (<WrapAlerts>
                        {this.state.creatingAlert ?
                            (<Flex><AlertImageDiv>
                                <AlertImage src={alert} alt="Alert" creatingAlert={this.state.creatingAlert}/>
                            </AlertImageDiv>
                                <AlertDescription>
                                    <input onInput={this._handleInput} ref={r => this.alertText = r} placeholder="Add Alert Description" value={this.state.alertDescription}/>
                                </AlertDescription></Flex>)
                            :
                            (<Flex><AlertImageDiv>
                                <AlertImage src={alert} alt="Alert"  creatingAlert={this.state.creatingAlert}/>
                            </AlertImageDiv>
                                <AlertDescription>
                                    No active alerts.
                                </AlertDescription></Flex>)
                        }

                    </WrapAlerts>)
                }

                {this.props.alert.length ?
                    <AddAlertDiv>
                        <AddAlert onClick={this._handleClear}>- Clear</AddAlert>
                    </AddAlertDiv>
                    :
                    <AddAlertDiv>
                        <AddAlert onClick={this._handleClick}>+ Alert</AddAlert>
                    </AddAlertDiv>
                }
            </Alert>
        )
    }
}

export default AlertInfo;