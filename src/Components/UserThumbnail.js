import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
height: 10%;
width: 100%;
`

const UserProfileThumbnail = styled.div`
width: 100%;
height: 100%;
margin: 0px;
display: flex;
flex-direction: row;
justify-content: flex-start;
`

const UserProfileThumbnailImageDiv = styled.div`
min-width: 75px;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
`

const UserProfileThumbnailImageDivSmall = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: white;
border-style: solid;
border-width: 2px;
border-color: white;
`

const UserProfileThumbnailDescription = styled.div`
padding: 0.2 1em;
font-size: 0.8em;
text-align: left;
display: flex;
  align-items: center;
  justify-content: center;
`


const UserProfileThumbnailImage = styled.img`
width: 50px;
height: 50px;
`

const LogoutButton = styled.button`
color: rgba(255,255,255,0.8);
border: none;
background-color: rgba(0,0,0,0);

&:hover{
    color: rgba(0, 231, 255, 0.8)
}
`

const ProfileButton = LogoutButton.extend`
font-size: 1.2em;
color: white;
`

class UserThumbnail extends Component {
    render() {
        return (
            <Wrapper>
                <UserProfileThumbnail>
                    <UserProfileThumbnailImageDiv>
                        <UserProfileThumbnailImageDivSmall>
                            <UserProfileThumbnailImage src={this.props.user.img} alt={this.props.user.name} />
                        </UserProfileThumbnailImageDivSmall>
                    </UserProfileThumbnailImageDiv >
                    <UserProfileThumbnailDescription>
                        <div><ProfileButton>{this.props.user.name}</ProfileButton></div>
                        <div>
                            <Link to={"/"} onClick={this.props.handleLogout}>
                                <LogoutButton>Logout</LogoutButton>
                            </Link>
                        </div>
                    </UserProfileThumbnailDescription>
                </UserProfileThumbnail>
            </Wrapper>
        )
    }
}

export default UserThumbnail
