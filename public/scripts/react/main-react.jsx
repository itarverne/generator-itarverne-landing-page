import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook';

class SocialFb extends React.Component {
  render() {
    return (
      <FacebookProvider appId="474812546226673">
        <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
      </FacebookProvider>
    );
  }
}

ReactDOM.render(
  <SocialFb />,
  document.getElementById('fb')
);

import { Share } from 'react-twitter-widgets'
 
ReactDOM.render((
  <Share
    url="rigaudie.fr"
    onLoad={() => console.log('Share twitter is loaded!')}
  />
), document.getElementById('twitter-share'));

import { Follow } from 'react-twitter-widgets'
 
ReactDOM.render((
  <Follow
    username="drigaudie"
    onLoad={() => console.log('Follow twitter is loaded!')}
  />
), document.getElementById('twitter-follow'));