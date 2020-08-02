import React, { Component } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Footer from '../components/Footer'
import users from '../components/users'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: [],
      streamData: []
    }

    this.getStreamers = this.getStreamers.bind(this)
  }

  componentDidMount () {
    this.getStreamers()
  }

  getStreamers () {
    const url = 'https://api.twitch.tv/kraken/users?login=dallas,dallasnchains'
    const userData = []
    const streamData = []
    users.forEach(user => {
      fetch(`${url}/users/${user}`)
        .then(response => response.json())
        .then(data => userData.push(data))

      fetch(`${url}/streams/${user}`)
        .then(response => response.json())
        .then(data => streamData.push(data))
    })

    this.setState({
      userData: [...userData],
      streamData: [...streamData]
    })
  }

  render () {
    const { userData, streamData } = this.state
    return (
      <div>
        <Header />
        {userData && <Feed userData={userData} streamData={streamData} />}
        <Footer />
      </div>
    )
  }
}

export default App
