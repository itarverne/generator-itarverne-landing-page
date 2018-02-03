import React, { Component } from 'react';
import styled from 'styled-components';
import FacebookProvider, { Like, Share as ShareFb} from 'react-facebook';

const ButtonFb = styled.button`
  border-radius: 3px;
  font-size: 11px;
  height: 20px;
  padding: 0 5px 0 5px;
  background-color: rgb(66, 103, 178);
  color: white;
  font-weight: bold;

  &:hover {
    background: #365899;
    cursor: pointer;
  }
`;

class SocialFbLike extends React.Component {
  render() {
    return (
      <FacebookProvider appId="474812546226673">
        <Like href="http://www.itarverne.com" colorScheme="dark" showFaces />
      </FacebookProvider>
    );
  }
}

ReactDOM.render(
  <SocialFbLike />,
  document.getElementById('fb-like')
);

class SocialFbShare extends React.Component {
  render() {
    return (
      <FacebookProvider appId="474812546226673">
        <ShareFb href="http://www.itarverne.com">
          <ButtonFb>Share</ButtonFb>
        </ShareFb>
      </FacebookProvider>
    );
  }
}

ReactDOM.render(
  <SocialFbShare />,
  document.getElementById('fb-share')
);

import { Share } from 'react-twitter-widgets'
 
ReactDOM.render((
  <Share
    url="itarverne.com"
    onLoad={() => console.log('Share twitter is loaded!')}
  />
), document.getElementById('twitter-share'));

import { Follow } from 'react-twitter-widgets'
 
ReactDOM.render((
  <Follow
    username="itarverne"
    onLoad={() => console.log('Follow twitter is loaded!')}
  />
), document.getElementById('twitter-follow'));