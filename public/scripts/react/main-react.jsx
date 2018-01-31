import React, { Component } from 'react';
import FacebookProvider, { Like, ShareButton } from 'react-facebook';

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
        <ShareButton href="http://www.itarverne.com" />
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