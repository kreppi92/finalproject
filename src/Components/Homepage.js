import styled from 'styled-components';
import React, { Component } from 'react';
import avatars from './avatars.js'
import { Link } from 'react-router-dom';
import '../App.css';

const darkGreen = "#24282b";
// const green = "#4d6059";
const lightGreen = "#7f8d89";


const Wrapper = styled.div`
background-color: ${darkGreen};
height: 100vh;
display: block;
justify-content: center;
align-items: center;
`;

const Row = styled.div`
width: 100%
`;

const ImageRow = styled.div`
width: 100%;
padding: 5% 0 0 0;
margins: auto;
`;

const LoginButton = styled.button`
    color: white;
    font-size: 1em;
    margin: 1em;
    width: 200px;
    height: 40px;
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
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleOpaque = styled.h1`
opacity: 0.6;
`

class Homepage extends Component {

    constructor() {
        super();
        this.state = {
            image: 0,
        }
    }

    _animation = () => {
        if (this.state.image > avatars.length - 3) {
            this.setState((st) => ({ image: 0 }))
        } else {
            this.setState((st) => ({ image: st.image + 1 }))
        }

    }

    componentDidMount() {
        this.interval = setInterval(this._animation, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Wrapper>
                <ImageRow>
                    <img src={avatars[this.state.image]} alt="House building animation" />
                </ImageRow>
                <Row>
                    {this.props.isLoggedIn ? <TitleWrapper><h1>Welcome&nbsp;</h1><TitleOpaque>{this.props.userName}</TitleOpaque></TitleWrapper> : <TitleWrapper><h1>MAP</h1><TitleOpaque>FOLIO</TitleOpaque></TitleWrapper>}
                    {this.props.isLoggedIn ?
                        (<Link to="/projects">
                            <LoginButton>Enter</LoginButton>
                        </Link>)
                        :
                        <LoginButton onClick={this.props.handleLogin}>LOGIN</LoginButton>
                    }

                </Row>
            </Wrapper>
        )
    }
}

export default Homepage;