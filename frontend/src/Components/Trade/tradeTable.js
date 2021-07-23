import React, { useState, useEffect } from 'react'

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { PORT } from '../../config'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
})

const TradeTable = (props) => {
    const classes = useStyles()
    const id= localStorage.getItem('id')

    useEffect(() => {
        axios.get(`${PORT}/getTrade/${id}`)
        .then(result => {
            setTrade(result.data)
        })
        .catch(err => console.log(err))
    }, [])

    const [trade, setTrade] = useState([])

    return(
        <div className="mainContent avoidTop">
    <TableContainer component={Paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Stock Name</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Average Price</TableCell>
                    <TableCell>Fees</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {trade.map((row) => (
    <TableRow key = {row.ticker}>
        <TableCell component="th" scope="row">{row.date}</TableCell>
        <TableCell>{row.ticker}</TableCell>
        <TableCell>{row.stockName}</TableCell>
        <TableCell>{row.action}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.cost}</TableCell>
        <TableCell>{row.units}</TableCell>
        <TableCell>{row.average}</TableCell>
        <TableCell>{row.fees}</TableCell>
    </TableRow>
))}
            </TableBody>
        </Table>
    </TableContainer>
    </div>
    )
}

export default TradeTable