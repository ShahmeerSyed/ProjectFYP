import React, { useState } from 'react'
import Axios from 'axios';
import Logo from '../src/img/favicon.png'

const App = () => {

  const [employeeData , setEmployeeData] = useState({
    id:'',
    fname:'',
  });
  
  const onsubmit = (event) => {
    event.preventDefault();

    

    Axios.post('http://localhost:3002/api/get',{
      ID : employeeData.id,
      NAME : employeeData.fname
    }).then((response)=>{
      const data = response.data
      // console.log(data)

      const count = Object.keys(data).length
      // console.log(count)
      
      if(count===0){
        alert("you entered wrong ID or NAME")
      }
      else{
        Axios.post('http://localhost:3002/api/post',{
          ID : employeeData.id,
          NAME : employeeData.fname
        })
      }
      
    })

    alert("Form submitted")
    setEmployeeData({ id : "" , fname : ""})
  }

  const inputchange= (event) => {
    // console.log(event.target.value)
    // console.log(event.target.name)

    const {value,name} = event.target

    setEmployeeData((preValue) => {
      return{
        ...preValue,
        [name]: value,
      }
    })
  }

  return(
    <>
    <form onSubmit={onsubmit} className="form">
      <div className="image">
        <img src={Logo} alt="img not loaded"/>
      </div>
      <div className="mainDiv">
        <h1>Enter Employee Details</h1>
        <input type='number' placeholder="Enter Your employee ID" name="id" onChange={inputchange} value={employeeData.id}/>
        <input type='text' style={{textTransform: "capitalize"}} placeholder="Enter Your Name" name="fname" onChange={inputchange} value={employeeData.fname}/>
        <button>Submit</button>
      </div>
      </form>
    </>
  )

}

export default App;
