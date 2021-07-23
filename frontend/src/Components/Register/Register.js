import React, {useState} from 'react'
import { Button, Box, InputAdornment, IconButton, Input, InputLabel, FormControl, Card, CardHeader, CardContent, Divider } from '@material-ui/core'
import './register.css'
import axios from 'axios'
import {PORT} from '../../config'
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { notify } from 'react-notify-toast';

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


const Register = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if(document.querySelector("#password").value === document.querySelector("#confirmPassword").value){
            axios.post(`${PORT}/addUser`, {
                email: document.querySelector("#email").value,
                username: document.querySelector("#username").value,
                password: document.querySelector("#password").value,                
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                if(err.response.data.error === "Used Email Address"){
                    notify.show("Used Email Address", "error", 4000)
                }
            })
        } else {
            notify.show("Passwords Should Match", "error", 4000)
        }
        
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    return(
        <>        
                <Box className={classes.root}>
            <Card>
                    <CardHeader                                                                      
                        title="Register"
                        subheader="Register on myportfolio"
                    />
                    <CardContent>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <FormControl 
                            margin="normal" 
                            required 
                            fullWidth 
                        >
                            <InputLabel>Email Address</InputLabel>
                            <Input                                                                                                            
                                type="email"      
                                id="email"                                               
                            />
                        </FormControl>
                        <FormControl 
                            margin="normal" 
                            required 
                            fullWidth
                        >
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input                                           
                                type="text"
                                id="username"
                            />
                        </FormControl>
                        <FormControl 
                            margin="normal" 
                            required 
                            fullWidth                
                            >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl 
                            margin="normal" 
                            required 
                            fullWidth                         
                        >
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input 
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                    <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
                    </FormControl>
                    </div>
                </form> 
                <Divider variant ="middle" />
                    <div>
                        <p align="left" className={classes.links}><a href="/login" className="links">Have an account? Login here</a></p>
                        <p align="left" className={classes.links}><a href="/login" className="links">Forgot password</a></p>
                    </div>
                </CardContent>
                </Card>
            </Box>        
        </>
    )
}

export default Register