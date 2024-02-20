import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import Foodedit from './Foodedit';

const Packageview = () => {
    const [ptype, setPtype] = useState([]);
    const [selected, setSelected] = useState();
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3005/ptview")
            .then(response => {
                console.log(response);
                setPtype(response.data);
            })
            .catch(err => console.log(err));
    }, []);

   

    const toggleStatus = (id) => {
        const selectedItem = ptype.find(item => item._id === id);
        const updatedStatus = selectedItem.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        axios.put("http://localhost:3005/ptupdatestatus/" + id, { status: updatedStatus })
            .then((response) => {
                // Update status in UI
                setPtype(prevState => prevState.map(item => item._id === id ? { ...item, status: updatedStatus } : item));
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const updatevalues = (value) => {
        console.log("UPDATED", value);
        setSelected(value);
        setUpdate(true);
    };

    var result =
        <div>
            <Navbar />
            <Sidebar />

            <center>
                <Typography><h3><b>Food Details view</b></h3></Typography>
            </center>
            <br />

            <TableContainer style={{ marginLeft: '15vw', width: "85vw" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Food code</TableCell>
                            <TableCell>Food Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ptype?.map((value, index) => (
                            <TableRow key={index}>
                                <TableCell>{value.packid}</TableCell>
                                <TableCell>{value.packname}</TableCell>
                                <TableCell>{value.pprice}</TableCell>
                                <TableCell><img src={`data:image/jpeg;base64,${Buffer.from(value.image.data).toString('base64')}`} width="50" height="50" alt="Error" /></TableCell>
                                <TableCell>{value.pdescription}</TableCell>
                                <TableCell>
                                    <button onClick={() => toggleStatus(value._id)}>{value.status}</button>
                                </TableCell>
                                <TableCell><EditIcon color='success' onClick={() => updatevalues(value)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    if (update) {
        result = <Foodedit data={selected} method='put' />
    }
    return (result)
};

export default Packageview;
