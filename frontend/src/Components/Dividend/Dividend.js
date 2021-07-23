import React from 'react'
import { Box, Card, CardHeader, CardContent, FormControl, InputLabel, Input, Button, makeStyles } from '@material-ui/core'
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

const Dividend = (props) => {
    const classes = useStyles()

    const handleSubmit = (event) => {
        event.preventDefault();

        let total = document.querySelector("#totalDiv").value
        let taxPercent = (document.querySelector("#taxPercent").value)
        let tax = total * ( taxPercent / 100)
        let net = total - tax

        let data = {
            "date": document.querySelector("#date").value,
            "ticker": document.querySelector("#ticker").value,
            "stockName": document.querySelector("#stockName").value,
            "total": total,
            "tax": tax,
            "taxPercent": taxPercent,
            "net": net
        }

        axios.put(`${PORT}/addDividend`, {
            id: localStorage.getItem('id'),
            data: data
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return(
        <div className="mainContent avoidTop">
            <Box className={classes.root}>
                <Card>
                    <CardHeader
                        title="Dividend"
                        subheader="Enter Dividend details"
                    />
                    <CardContent>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                        >
                            <Input 
                                id="date"
                                type="date"
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                        >
                            <InputLabel>Ticker</InputLabel>
                            <Input 
                                id="ticker"
                                type="text"
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                        >
                            <InputLabel>Stock Name</InputLabel>
                            <Input 
                                id="stockName"
                                type="text"
                            />
                        </FormControl>
                        <FormControl 
                            margin="normal"
                            fullWidth
                            required
                        >
                            <InputLabel>Total Dividend</InputLabel>
                            <Input 
                                id="totalDiv"
                                type="number"
                                inputProps={{"step": "any"}}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                        >
                            <InputLabel>Tax Percentage</InputLabel>
                            <Input 
                                id="taxPercent"
                                type="number"
                                inputProps={{"step":"any"}}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <Button color="primary" type="submit" variant="contained" size="large">Submit</Button>
                        </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Dividend