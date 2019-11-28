import React from 'react';
import FacebookProvider, { Like, Share as ShareFb } from 'react-facebook';
import ReactLinkedIn from 'react-share-linkedin';
import styled from 'styled-components';

class SocialLinkedinShare extends React.Component {
  render() {
    return (
      <ReactLinkedIn
        url="http://itarverne.com"
        title="The web developer expert in Auvergne"
        summary="The web developer expert in Auvergne"
        borderRadius="3px"
      />
    );
  }
}
// ReactDOM.render(
//   <SocialLinkedinShare />,
//   document.getElementById('js-in-share')
// );

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
        <Like href="https://www.facebook.com/itarverne/" colorScheme="dark" layout="button_count" showFaces />
      </FacebookProvider>
    );
  }
}

// ReactDOM.render(
//   <SocialFbLike />,
//   document.getElementById('js-fb-like')
// );

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



// ReactDOM.render((
//   <Follow
//     username="itarverne"
//     onLoad={() => console.log('Follow twitter is loaded!')}
//   />
// ), document.getElementById('js-twitter-follow'));