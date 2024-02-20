import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import './Main.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Food = () => {

  var [inputs, setInputs] = useState({
    "fdid": '', "fdname": '', "fdtype": '',
    "price": '', "description": '', "status": 'ACTIVE'
  })
  
  var [planttype, setPlanttype] = useState([]);
  var [selectedimage, setSelectedimage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(inputs)
    axios.get ('http://localhost:3005/pview')
      .then(response => {
        console.log(response.data)
        setPlanttype(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    console.log(inputs)
  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.plantphoto = file;
  }

  const savedata = () => {
    const formdata = new FormData();
    formdata.append('fdid', inputs.fdid);
    formdata.append('fdname', inputs.fdname);
    formdata.append('fdtype', inputs.fdtype);
    formdata.append('price', inputs.price);
    formdata.append('description', inputs.description);
    formdata.append('status', inputs.status);
    formdata.append('fdphoto', selectedimage);
    console.log(formdata);

    fetch ('http://localhost:3005/pnew',
      { method: 'post', body: formdata })
      .then((response) => response.json())
      .then((data) => {
        alert("Record Saved")
      })
      .catch((err) => {
        console.log("err")
      })
    navigate('/foodview')
  }

  return (
    <div className='background-3'>
      <Navbar/>
      <Sidebar/>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <center><h1>Food Details</h1>
            <form>
              Food Code : <input type="text" name="fdid" id='p1' value={inputs.fdid} onChange={inputHandler} />
              <br /><br />
              Food Name : <input type="text" name="fdname" id="p2" value={inputs.fdname} onChange={inputHandler} />
              <br /><br />
              Food Type :
              <select name="fdtype" value={inputs.fdtype} onChange={inputHandler}  >
              <option value="Non.veg"> Non.veg</option>
                      <option value="veg"> veg</option>
              </select>
              <br /><br />
              
              Price : <input type="number" name="price" id="p6" value={inputs.price} onChange={inputHandler} />
              <br /><br />
              Description : <textarea rows='4' name='description' id='p7' value={inputs.description} onChange={inputHandler} />
              <br /><br />
              
              Image : <input type="file" onChange={handleImage} />
              <br /><br />
              Status   &nbsp;
              <select name='status' value={inputs.status} onChange={inputHandler}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <br /><br />
              <Button variant='contained' onClick={savedata}>SAVE</Button>

            </form>
          </center>
        </CardContent>
      </Card>

    </div>
  )
}

export default Food