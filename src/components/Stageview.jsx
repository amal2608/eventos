import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Stageview = () => {
  const [stages, setStages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3005/stageview')
      .then(response => {
        console.log(response);
        setStages(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    // Navigate to the edit page for the selected stage
    navigate(`/edit-stage/${id}`);
  };

  const handleDelete = (id) => {
    // Delete the stage with the given ID
    axios.delete(`http://localhost:3005/stagedelete/${id}`)
      .then(response => {
        // Remove the deleted stage from the state
        setStages(prevStages => prevStages.filter(stage => stage._id !== id));
      })
      .catch(error => {
        console.error('Error deleting stage:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stage Code</TableCell>
              <TableCell>Stage Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stage Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stages.map(stage => (
              <TableRow key={stage._id}>
                <TableCell>{stage.stageCode}</TableCell>
                <TableCell>{stage.stageName}</TableCell>
                <TableCell>{stage.price}</TableCell>
                <TableCell>{stage.description}</TableCell>
                <TableCell>{stage.stageType}</TableCell>
                <TableCell>{stage.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(stage._id)}><EditIcon /></Button>
                  <Button onClick={() => handleDelete(stage._id)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Stageview
