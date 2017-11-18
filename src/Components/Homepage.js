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
        setInterval(this._animation, 1000)
    }

    render() {
        return (
            <Wrapper>
                <ImageRow>
                    <img src={avatars[this.state.image]} alt="House building animation"/>
                </ImageRow>
                <Row>
                    <h1>HOME BUILDER</h1>
                    <Link to={"/projects"}>
                        <LoginButton> LOGIN </LoginButton>
                    </Link>
                </Row>
            </Wrapper>
        )
    }
}

export default Homepage;