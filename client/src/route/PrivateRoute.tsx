import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom'
import { userSelector } from 'module/redux/user'
import { MUser } from 'model/index'
import { auth } from 'module/redux/user'

type RoutePageComponent =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>
interface IProps {
  page: RoutePageComponent
}

const PrivateRoute: React.FC<IProps & RouteProps> = (props) => {
    const dispatch = useDispatch()
    console.log('PrivateRoute:' + JSON.stringify(props))
    dispatch(auth())

    const Page: RoutePageComponent = props.page
    
    const user: MUser = useSelector(userSelector)
    return (
      <Route
        {...props}
        render={(props) =>
            user.userData.isAuth ? (
            <Page {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }
  export default PrivateRoute