import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import ProtectedRoute from './Services/protected.route';
import Home from './Components/Home/Home'
import Register from './Components/Register/Register';
import Trade from './Components/Trade/Trade'
import Deposit from './Components/Deposit/Deposit';
import Dividend from './Components/Dividend/Dividend';
import TradeTable from './Components/Trade/tradeTable'
import Login from './Components/Login/Login'
import Sidebar from './Components/Sidebar/Sidebar'
import DividendTable from './Components/Dividend/dividendTable';
import DepositTable from './Components/Deposit/depositTable';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <Route exact path ="/register" component={Register} />
                <ProtectedRoute exact path ="/addtrade" component={Trade} />
                <ProtectedRoute exact path ="/adddeposit" component={Deposit} />
                <ProtectedRoute exact path ="/adddividend" component={Dividend} />
                <ProtectedRoute exact path ="/viewtrade" component={TradeTable} />
                <ProtectedRoute exact path ="/viewdividend" component={DividendTable} />
                <ProtectedRoute exact path ="/viewDeposit" component={DepositTable} />
                <Route exact path ="/login" component={Login} />
                <Route exact path ="/side" component={Sidebar} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;