import React from 'react'
import { Card, CardHeader, CardContent, Button, FormControl, Input, InputLabel, makeStyles, Box } from '@material-ui/core'
import axios from 'axios'
import { PORT } from '../../config'
import '../Register/register.css'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: '0 auto',    
        padding: '2rem 1rem',        
    }
}))

const Deposit = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            "date": document.querySelector("#date").value,
            "broker": document.querySelector("#broker").value,
            "amount": document.querySelector("#amount").value,
            "fees": document.querySelector("#fees").value
        }

        axios.put(`${PORT}/addDeposit`, {
            id: localStorage.getItem('id'),
            data: data
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const classes = useStyles()
    return(
        <div className="mainContent avoidTop">
            <Box className={classes.root}>
                <Card>
                    <CardHeader 
                        title="Deposit"
                        subheader="Enter Deposit details"
                    />
                    <CardContent>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <FormControl
                                margin="normal"
                                fullWidth
                                required
                            >                                
                                <Input 
                                    type="date"
                                    id="date"
                                />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                fullWidth
                                required
                            >
                                <InputLabel>Broker</InputLabel>
                                <Input 
                                    type="text"
                                    id="broker"
                                />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                fullWidth
                                required
                            >
                                <InputLabel>Amount</InputLabel>
                                <Input
                                    id="amount"
                                    type="number"
                                    inputProps={{"step": "any"}}
                                />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                fullWidth
                            >
                                <InputLabel>Fees</InputLabel>
                                <Input 
                                    id="fees"
                                    type="number"
                                    inputProps={{"step": "any"}}
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

export default Deposit