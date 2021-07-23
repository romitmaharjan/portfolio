import React, { useState, useEffect } from 'react'

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { PORT } from '../../config'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
})

const DividendTable = (props) => {
    const classes = useStyles()
    const id= localStorage.getItem('id')

    useEffect(() => {
        axios.get(`${PORT}/getDividend/${id}`)
        .then(result => {
            setDividend(result.data)
        })
        .catch(err => console.log(err))
    }, [])

    const [dividend, setDividend] = useState([])

    return(
        <div className="mainContent avoidTop">
    <TableContainer component={Paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Stock Name</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Tax</TableCell>
                    <TableCell>Tax %</TableCell>
                    <TableCell>Net</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dividend.map((row) => (
                    <TableRow key = {row.ticker}>
                        <TableCell component="th" scope="row">{row.date}</TableCell>
                        <TableCell>{row.ticker}</TableCell>
                        <TableCell>{row.stockName}</TableCell>
                        <TableCell>{row.total}</TableCell>
                        <TableCell>{row.tax}</TableCell>
                        <TableCell>{row.taxPercent}</TableCell>
                        <TableCell>{row.net}</TableCell>                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </div>
    )
}

export default DividendTable