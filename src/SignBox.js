import React from 'react'
import styled from 'styled-components'
import {emailExists} from './db'
import {Motion, spring} from 'react-motion'
import SignInIcon from 'react-icons/lib/fa/sign-in'
import SignUpIcon from 'react-icons/lib/fa/user-plus'
import chroma from 'chroma-js'

const Box = styled.div`
  font-size: 2em;
  width: 10em;
  border: 1px solid #eee;
  margin: auto;
  padding: 1em;
`

const Title = styled.h1`
  margin: 0;
  line-height: 1.9;
`

const Input = styled.input`
  display: block;
  font-size: 1em;
`

const SIGN_UP_COLOR = '#388E3C'
const SIGN_IN_COLOR= '#1976D2'

const Button = styled.button`
  margin-top: 0.5em;
  font-size: 0.7em;
  height: 2em;
  width: 100%;
  color: #f7f7f7;
  text-transform: uppercase;
  font-weight: bold;
  border: 0;
`

const IconBox = styled.div`
  display: inline-block;
  margin: 0 0.2em;
`

const colormap = chroma.scale([SIGN_UP_COLOR, SIGN_IN_COLOR])

class IsUserExists extends React.Component {
  state = {loading: false, data: false, error: null}

  refetch = (email) => {
    this.setState({loading: true, data: false, error: null}, () => {
      emailExists(email).then(data => {
        this.setState({loading: false, error: null, data})
      }).catch(error => {
        this.setState({loading: false, data: false, error})
      })
    })
  }

  componentDidMount() {
    this.refetch(this.props.email)
  }

  componentWillReceiveProps(props) {
    this.refetch(props.email)
  }

  render() {
    return this.props.children ? this.props.children(this.state) : null
  }
}

export default class SignBox extends React.Component {
  state = {email: ''}

  updateEmailState = e => this.setState({ email: e.target.value })

  render() {
    return (
      <IsUserExists email={this.state.email}>
        {({data, loading}) => (
          <Box>
            <Title>{data ? 'Sign in' : 'Sign up'}</Title>
            <Input name="kaki" onChange={this.updateEmailState} type="email" placeholder="em@il.com" />
            <Input type="password" placeholder="p4ssw0rd" />
            <Motion
              defaultStyle={{buttonColor: 0}}
              style={{buttonColor: spring(data ? 1 : 0)}}
            >
              {({buttonColor}) => (
                <Button
                  disabled={loading}
                  state={data ? 'signin' : 'signup'}
                  style={{backgroundColor: colormap(buttonColor).hex()}}
                >
                  <IconBox>
                    <Motion
                      defaultStyle={{degree: 0, opacity: 0}}
                      style={{
                        degree: spring(!data ? 0 : 45),
                        opacity: spring(!data ? 1 : 0),
                      }}
                    >
                      {({degree, opacity}) => (
                        <SignUpIcon style={{verticalAlign: 'bottom', transform: `rotate(${degree}deg)`, opacity}} />
                      )}
                    </Motion>
                    <Motion
                      defaultStyle={{scale: 0.4, opacity: 0}}
                      style={{
                        scale: spring(data ? 1 : 0.4),
                        opacity: spring(data ? 1 : 0),
                      }}
                    >
                      {({scale, opacity}) => (
                        <SignInIcon style={{position: 'relative', marginRight: '-1em', left: '-1em', verticalAlign: 'bottom', transform: `scale(${scale})`, opacity}} />
                      )}
                    </Motion>
                  </IconBox>
                  {data ? 'Sign in' : 'Sign up'}
                </Button>
              )}
            </Motion>
          </Box>
        )}
      </IsUserExists>
    );
  }
}
