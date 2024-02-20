import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Foodedit from './Foodedit';
import { Buffer } from 'buffer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Foodview = () => {


  var [Plantdetailsview, setPlantdetailsview] = useState([])
  var [selected, setSelected] = useState();
  var [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3005/pview/')
      .then(response => {
        console.log(response.data);
        setPlantdetailsview(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const deletevalues = (id) => {
    console.log("Deleting", id);
    axios.put(`http://localhost:3005/updatestatus/${id}`)
      .then(() => {
        console.log("Deleted successfully");
        alert("DELETED");
        setPlantdetailsview(prevDetails =>
          prevDetails.map(item =>
            item._id === id ? { ...item, status: "INACTIVE" } : item
          )
        );
      })
      .catch(error => {
        console.error("Error deleting record:", error);
        alert("Error deleting record. Please check console for details.");
      });
  };

  const updatevalues = (value) => {
    console.log("Updating", value);
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food ID</TableCell>
              <TableCell>Food Name</TableCell>
              <TableCell>Food Type</TableCell>

              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>

              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Plantdetailsview.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{value.fdid}</TableCell>
                  <TableCell>{value.fdname}</TableCell>
                  <TableCell>{value.fdtype}</TableCell>

                  <TableCell>{value.price}</TableCell>
                  <TableCell>{value.description}</TableCell>

                  <TableCell>
                    <img src={`data:image/jpeg;base64, ${Buffer.from(value.plantphoto.data).toString('base64')}`}
                      width="50" height="50" alt="Error" />
                  </TableCell>
                  <TableCell>{value.status}</TableCell>
                  <TableCell>
                    <ModeEditOutlineIcon color='secondary' onClick={() => updatevalues(value)} />
                  </TableCell>
                  <TableCell>
                    <DeleteForeverIcon color='error' onClick={() => deletevalues(value._id)}>
                    </DeleteForeverIcon>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>


    </div>

  if (update) {
    result = <Foodedit data={selected} method='put' />
  }

  return (result)
}



export default Foodview