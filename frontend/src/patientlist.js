
import React from 'react';
import {render} from 'react-dom';

import moment from 'moment'
import {connect } from 'react-redux';


@connect((store)=>{
  return{
    data:store.data
  }
})
export default class PatientList extends React.Component{
  
  componentDidMount(){
    //dispatching action to get all patients
    this.props.dispatch((dispatch)=>{
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/api/getallrecords",
        dataType: "json",
        success: function(records) {
          dispatch({type:"getList",payload:records})
        },error:function(err){
          console.log("error")
        }
      });

    })
  } 
  render(){
    return <div>
    <table>
      <tr>
        <th>FirstName</th>
        <th>lastName</th>
        <th>Age</th>
        <th>DateOfBirth</th>
        <th>Gender</th>
      </tr>
    {
      this.props.data.map((item,i)=>{
        return(
          <tr id={i}>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.age}</td>
            <td>{moment(item.dob).format("DD/MM/YYYY")}</td>
            <td>{item.gender}</td>
          </tr>
          )
      })
    }
    </table>
    </div>
  }
}

