import React from 'react'
import '../styles/_feed.styl'
import users from './users'
import User from './User'

const Feed = () => {
  return (
    <div className="feed">
      {users.map(user => <User user={user} />)}
    </div>
  )
}

export default Feed
