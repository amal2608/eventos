import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './Main.css';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Packageedit = () => {
  const { id } = useParams(); // Get the id parameter from the route
  const [ptype, setPtype] = useState({
    packname: '',
    pprice: '',
    pdescription: '',
    status: 'ACTIVE'
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3005/pakview/${id}`) // Use the correct route for fetching package details
      .then(response => {
        setPtype(response.data);
      })
      .catch(error => {
        console.error('Error fetching package details:', error);
      });
  }, [id]); // Add id to dependency array

  const ptypehandler = (event) => {
    const { name, value } = event.target;
    setPtype((prevPtype) => ({ ...prevPtype, [name]: value }));
  };

  const saveData = () => {
    console.log(ptype)
    axios.put(`http://localhost:3005/ptedit/${id}`, ptype)
      .then((response) => {
        alert("Record updated");
        navigate('/packageview');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='background-3'>
      <Navbar />
      <Sidebar />
      <form>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <center>
              <h1>Package Type</h1>
              Food Name :{' '}
              <input
                type="text"
                name="packname"
                value={ptype.packname}
                onChange={ptypehandler}
              />
              <br /><br />
              Price :{' '}
              <input
                type="number"
                name="pprice"
                value={ptype.pprice}
                onChange={ptypehandler}
              />
              <br /><br />
              Description :{' '}
              <textarea
                rows='4'
                name='pdescription'
                value={ptype.pdescription}
                onChange={ptypehandler}
              />
              <br /><br />
              Status   &nbsp;
              <select
                name='status'
                value={ptype.status}
                onChange={ptypehandler}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <br /><br />
              <Button variant='contained' onClick={saveData}>SAVE</Button>
            </center>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Packageedit;
