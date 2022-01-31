import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Route,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom'
import { auth } from 'module/redux/user'

type RoutePageComponent =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>
interface IProps {
  page: RoutePageComponent
}

const PublicRoute: React.FC<IProps & RouteProps> = (props) => {
    const dispatch = useDispatch()
    dispatch(auth())
    console.log('PublicRoute:' + JSON.stringify(props))
    
    const Page: RoutePageComponent = props.page    
    
    return (
        <Route
        {...props}
        render={(props) =>
            <Page {...props} />
        }
      />
    )
  }
  export default PublicRoute