import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import SignBox from './SignBox'

const FullPage = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  align-items: center;
  justify-content: center;
`

const Instructions = styled.div`
margin-top: 1em;
`

const Code = styled.code`
background-color: rgba(0,0,0,0.05)
`

class App extends Component {
  render() {
    return (
      <FullPage>
        <div>
          <SignBox />
          <Instructions>
            Try to be <Code>gal@hagever.com</Code>, <Code>omritzek@hagever.com</Code> or any other email.
          </Instructions>
        </div>
      </FullPage>
    );
  }
}

export default App;
