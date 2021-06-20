import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList } from './feature/posts/PostsList'
import { AddPostForm } from './feature/posts/AddPostForm'
import { SinglePostPage } from './feature/posts/SinglePostPage'
import { EditPostForm } from './feature/posts/EditPostForm'
import { UsersList } from './feature/users/UsersList'
import { UserPage } from './feature/users/UserPage'
import { NotificationsList } from './feature/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm/>
                <PostsList/>
              </React.Fragment>
            )}
          />
          <Route 
            exact
            path="/posts/:postId"
            component={SinglePostPage}
          />
          <Route 
            exact
            path="/editPost/:postId"
            component={EditPostForm}
          />
          <Route 
            exact
            path="/users"
            component={UsersList}
          />
          <Route 
            exact
            path="/users/:userId"
            component={UserPage}
          />
          <Route 
            exact
            path="/notifications"
            component={NotificationsList}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
