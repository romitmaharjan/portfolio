import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { login } from './auth'
import Sidebar from '../Components/Sidebar/Sidebar'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => (
            login() ? 
            <>            
                <Sidebar />    
                <Component {...props} /> 
                </>
            : <Redirect to='/login' />            
        )}
        />              
    )    
}

export default ProtectedRoute