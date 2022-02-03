import React from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom'
import { userSelector } from 'module/redux/user'
import { MUser } from 'model/index'

type RoutePageComponent =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>
interface IProps {
  page: RoutePageComponent
}

const PrivateRoute: React.FC<IProps & RouteProps> = (props) => {
    //const dispatch = useDispatch()
    console.log('PrivateRoute:' + JSON.stringify(props))
    //dispatch(auth())
    // auth를 또 dispatch하니까 user가 바뀌고 또 호출하고 무한루프에 빠짐

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