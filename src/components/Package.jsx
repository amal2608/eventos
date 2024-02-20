import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import './Main.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Package = () => {
  const [ptype, setPtype] = useState({
    packid: '',
    packname: '',
    pprice: '',
    pdescription: '',
    status: 'ACTIVE'
  });

  const [status, setStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const ptypeHandler = (event) => {
    setStatus(event.target.value);
    const { name, value } = event.target;
    setPtype((prevPtype) => ({ ...prevPtype, [name]: value }));
  };

  const saveData = () => {
    const formData = new FormData();
    formData.append('packid', ptype.packid);
    formData.append('packname', ptype.packname);
    formData.append('pprice', ptype.pprice);
    formData.append('image', selectedImage);
    formData.append('pdescription', ptype.pdescription);
    formData.append('status', ptype.status);

    fetch('http://localhost:3005/ptnew', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(() => {
        alert('Record saved');
        navigate('/packageview');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPtype((prevPtype) => ({ ...prevPtype, image: file }));
  };

  return (
    <div className='background-3'>
      <Navbar />
      <Sidebar />
      <form>
        <Card sx={{ minWidth: 275, backgroundColor: '#1f1f1f', color: '#ffffff' }}>
          <CardContent>
            <center>
              <h1>Food Items</h1>
              Food Code:{' '}
              <input type='text' name='packid' id='p1' value={ptype.packid} onChange={ptypeHandler} />
              <br />
              <br />
              Food Name:{' '}
              <input type='text' name='packname' id='p2' value={ptype.packname} onChange={ptypeHandler} />
              <br />
              <br />
              Price:{' '}
              <input type='number' name='pprice' id='p6' value={ptype.pprice} onChange={ptypeHandler} />
              <br />
              <br />
              Image:{' '}
              <input type='file' onChange={handleImage} />
              <br />
              Description:{' '}
              <textarea
                rows='4'
                name='pdescription'
                id='p7'
                value={ptype.pdescription}
                onChange={ptypeHandler}
              />
              <br />
              <br />
              Status&nbsp;
              <select name='status' value={status} onChange={ptypeHandler}>
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </select>
              <br />
              <br />
              <Button variant='contained' onClick={saveData}>
                SAVE
              </Button>
            </center>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Package;
