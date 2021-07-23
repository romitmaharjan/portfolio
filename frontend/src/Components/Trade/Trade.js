import React from 'react'
import { Button, Card, CardHeader, CardContent, Input, InputLabel, FormControl, makeStyles, Select, Box } from '@material-ui/core'
import axios from 'axios'
import {PORT} from '../../config'
import "../Register/register.css"

const handleSubmit = (event) => {
    event.preventDefault();
    let data = {"date": document.querySelector("#date").value, 
    "ticker":document.querySelector("#ticker").value,
    "stockName": document.querySelector("#stockName").value,
    "action": document.querySelector("#action").value,
    "amount": document.querySelector("#amount").value,
    "cost": document.querySelector("#cost").value,
    "units": document.querySelector("#amount").value / document.querySelector("#cost").value,
    "fees": document.querySelector("#fees").value
    }

    axios.put(`${PORT}/addTrade`, {
        id: localStorage.getItem('id'),
        data: data
    })
    .then(result => console.log(result))
    .catch(err => console.log(err)) 
}

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
}))

const Trade = (props) => {
    const classes = useStyles();
    return(
        <div className="mainContent avoidTop">               
            <Box className={classes.root}>
                <Card>
                    <CardHeader                                                                      
                        title="Trade"
                        subheader="Enter Trade Details"
                    />
                    <CardContent>
                    <form autoComplete="off" onSubmit={handleSubmit}>                        
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth                            
                            >
                                <Input 
                                    type="date"
                                    id="date"                                                                      
                                />
                            </FormControl>
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Ticker</InputLabel>
                                <Input 
                                    type="text"
                                    id="ticker"                                    
                                />
                            </FormControl>
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Name</InputLabel>
                                <Input 
                                    type="text"
                                    id="stockName"                                    
                                />
                            </FormControl>
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Action</InputLabel>
                                <Select 
                                    native
                                    id="action"                                    
                                >
                                    <option aria-label="None" value="" />
                                    <option value="BUY">BUY</option>
                                    <option value="SELL">SELL</option>
                                </Select>
                            </FormControl>
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Amount</InputLabel>
                                <Input 
                                    type="number"
                                    id="amount"
                                    inputProps={{step: "any"}}   
                                    title="Just numbers"                                                          
                                />
                            </FormControl>
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Cost</InputLabel>
                                <Input 
                                    type="number"
                                    id="cost" 
                                    inputProps={{step: "any"}}
                                />
                            </FormControl>                            
                            <FormControl 
                                margin="normal" 
                                required 
                                fullWidth
                            >
                                <InputLabel>Fees</InputLabel>
                                <Input 
                                    type="number"
                                    id="fees"   
                                    inputProps={{step: "any"}}                                 
                                />
                            </FormControl>                            
                            <FormControl fullWidth margin="normal">
                                <Button type="submit" color="primary" variant="contained" size="large">Submit</Button>
                            </FormControl>
                    </form>                    
                    </CardContent>                                
                </Card>   
                </Box>                  
        </div>
    )
}

export default Trade