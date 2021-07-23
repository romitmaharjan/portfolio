import React, { useState, useEffect } from 'react'

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { PORT } from '../../config'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
})

const DepositTable = (props) => {
    const classes = useStyles()
    const id= localStorage.getItem('id')

    useEffect(() => {
        axios.get(`${PORT}/getDeposit/${id}`)
        .then(result => {
            setDeposit(result.data)
        })
        .catch(err => console.log(err))
    }, [])

    const [deposit, setDeposit] = useState([])

    return(
        <div className="mainContent avoidTop">
    <TableContainer component={Paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Broker</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Fees</TableCell>                    
                </TableRow>
            </TableHead>
            <TableBody>
                {deposit.map((row) => (
                    <TableRow key = {row.ticker}>
                        <TableCell component="th" scope="row">{row.date}</TableCell>
                        <TableCell>{row.broker}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.fees}</TableCell>                                       
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </div>
    )
}

export default DepositTable