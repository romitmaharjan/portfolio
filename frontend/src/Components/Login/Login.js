import React, {useState} from 'react'

import { makeStyles, Box, Card, CardHeader, CardContent, FormControl, InputLabel, Input, InputAdornment, Button, IconButton, Divider } from '@material-ui/core'
import axios from 'axios'
import { PORT } from '../../config'
import '../Register/register.css'
import { notify } from 'react-notify-toast'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {login} from '../../Services/auth'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: '0 auto',    
        padding: '2rem 1rem',        
    },    
    links: {
        margin: '10px auto',
        paddingLeft: 10
    }
}));

const Login = (props) => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`${PORT}/login`, {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value            
        })
        .then(result => {
            const token = result.data.accessToken
            const id = result.data.id
            localStorage.setItem('jwt-token', token) 
            localStorage.setItem('id', id)
            login();     
            props.history.push('/')      
        })
        .catch(err => {
            if(err.response !== undefined){
                if(err.response.data.error === "Invalid Credentials"){
                    notify.show("Please enter valid Email Address or Password", "error", 4000)
                } else if(err.response.data.error === "Requires Verification"){
                    notify.show("Please Verify Your Email Address", "error", 4000)
                }                
            }
        })
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    return(
        <div>
            <Box className={classes.root}>
                <Card>
                    <CardHeader 
                        title="Login"
                        subheader="Login to myportfolio"
                    />
                    <CardContent>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <FormControl
                                margin="normal"
                                fullWidth
                                required
                            >
                                <InputLabel>Email Address</InputLabel>
                                <Input 
                                    id="email"
                                    type="email"
                                />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                fullWidth
                                required
                            >
                                <InputLabel>Password</InputLabel>
                                <Input 
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff /> }    
                                            </IconButton> 
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                    <Button type="submit" color="primary" variant="contained" size="large">Submit</Button>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>

            </Box>
        </div>
    )
}

export default Login
