
import React from 'react';
import {render} from 'react-dom';



import moment from 'moment'
export default class Form extends React.Component{
  constructor(props){
    super(props);
    this.state={
      age:0
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();         
    let patientJson = {
      firstname:event.target.firstname.value,
      lastname:event.target.lastname.value,
      age:event.target.age.value,
      dob:event.target.dob.value,
      gender:event.target.gender.value,
      phone:event.target.phone.value
    }

    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/api/postpatient",
      data: patientJson,
      dataType: "json",
      success: function(resultData) {
        alert("Entry Added");
      },
      error: function(err){
        console.log("error occured",err);
      }
      });
  };

  //calculating age based on date of birth
  setAge = (e) =>{
    let dob = moment(e.target.value);
    let now = moment(new Date());
    this.setState({age:Math.floor(moment.duration(now.diff(dob)).asYears())});
  }
  
  render(){
    return <div>
    <form onSubmit={(e)=>this.handleSubmit(e)}>
    <table>
      <tr>
        <th>First name</th>
        <td><input type="text" name="firstname" required/></td>
      </tr>
      <tr>
        <th>Last name</th>
        <td><input type="text" name="lastname" required/></td>
      </tr>
      <tr>
        <th>Date of Birth</th>
        <td><input type="date" name="dob" required onInput={(e)=>this.setAge(e)}/></td>
      </tr>
      <tr>
        <th>Age</th>
        <td><input id = "age" type="number" name="age"  value = {this.state.age} required min={0} max={120}/></td>
      </tr> 
      <tr>
        <th>Gender</th>
        <td>
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>PhoneNumber</th>
        <td><input type="text" name="phone" pattern="[789][0-9]{9}" required/></td>
      </tr>
      <tr><input type="submit" value="Submit"/>
      </tr>
    </table>
    </form>

    </div>
  }
}

