import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/_user.styl'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      img: 'http://placehold.it/300x300',
      online: false,
      stream: 'unknown'
    }
  }

  componentDidMount () {
    const url = 'https://wind-bow.glitch.me/twitch-api'
    const { user } = this.props
    fetch(`${url}/users/${user}?callback=`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: data.display_name,
          img: data.logo
        })
      })

    fetch(`${url}/streams/${user}?callback=`)
      .then(response => response.json())
      .then(data => {
        if (data.stream) {
          this.setState({
            online: true,
            stream: data.stream.channel.status
          })
        } else {
          this.setState({
            online: false,
            stream: 'Not streaming'
          })
        }
      })
  }

  render () {
    const { name, img, online, stream } = this.state
    return (
      <div className="user">
        <div className="user-info">
          <img src={img} />
          <div className="user-text">
            <h3>{name}</h3>
            <h4>{stream}</h4>
          </div>
        </div>
        <div className={online ? 'circle online' : 'circle offline'} />
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.string.isRequired
}
export default User
