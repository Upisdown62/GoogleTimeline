import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from "react-router-dom"
//import Auth from "../hoc/auth"
// pages for this product
import MainPage from './views/MainPage/MainPage'
import GuidePage from './views/Guide/GuidePage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import TimelineEditPage from './views/Timeline/EditPage/TlEditPage'
import TimelineUploadPage from './views/Timeline/UploadPage/TlUploadPage'
import NavBar from "./views/NavBar/NavBar"
//import Footer from "./views/Footer/Footer"
import Progress from './utils/Progress/Progress.js'
//import store from '../_store/index'
import { useSelector } from 'react-redux'
import './App.css'
import { ThemeProvider } from 'theme/ThemeProvider'
import { SnackbarProvider } from 'notistack'
import PrivateRoute from 'route/PrivateRoute'
import PublicRoute from 'route/PublicRoute'
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  //window.store = store
  // const appLoading = useSelector(state => state.progress.loading)

  return (
    <SnackbarProvider>
      <ThemeProvider>
        <Suspense fallback={(<div>Loading...</div>)}>
          {/* <Progress show={appLoading}/> */}
          <NavBar/>
          <div style={{ paddingTop: '69px' }}>
            <Switch>
              {/* <Route exact path="/" component={Auth(MainPage, null)} />
              <Route exact path="/guide" component={Auth(GuidePage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/timelineEdit" component={Auth(TimelineEditPage, true)} />
              <Route exact path="/timelineUpload" component={Auth(TimelineUploadPage, true)} /> */}

              <PublicRoute exact path="/" page={MainPage}/>
              <PublicRoute exact path="/guide" page={GuidePage}/>
              <PublicRoute exact path="/login" page={LoginPage}/>
              <PublicRoute exact path="/register" page={RegisterPage}/>

              <PrivateRoute exact path="/timelineEdit" page={TimelineEditPage}/>
              <PrivateRoute exact path="/timelineUpload" page={TimelineUploadPage}/>
            </Switch>
          </div>
          {/* <Footer /> */}
        </Suspense>
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App
