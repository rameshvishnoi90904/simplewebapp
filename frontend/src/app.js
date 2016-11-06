/*
All initialization variables declared in this block
*/
import React from 'react';
import ReactDOM from 'react-dom';


import Form from './form';
import PatientList from './patientlist';

import {Provider} from 'react-redux';
import store from './store';

import {connect } from 'react-redux';

@connect((store)=>{
  return{
    data:[]
  }
})

//storing component as state variable

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      display:<PatientList/>, // displaying patient list as default screen
      list:true //flag for type of screen displayed
    }
  }

  

 toggleScreen(){
    if(this.state.list){
      this.setState({display:<Form/>,list:false})
    }else{
      this.setState({display:<PatientList/>,list:true})
    }
  }
  

  handleSubmit = (event) => {
    event.preventDefault(); //preventing default submit button action
    const self = this;
     $.ajax({
      type: 'POST',
      url: "http://localhost:3000/api/findByName",
      data: {name:event.target.firstname.value},
      dataType: "json",
      success: function(resultData) {
        if(resultData.length != 0){
          self.props.dispatch({type:'search',payload:resultData}) //dispatching action for updating search result
        }else{
          alert("No Record Found");
        }
      },
      error: function(err){
        console.log("error occured",err);
      }
      });
  }
  render(){
    const divStyle = {
      width:250,
      padding:4
    };

    const button = (this.state.list)?"Add new Patient":"Display List" // updating button based on screen

    return <div>
    <button type="button" onClick={()=>this.toggleScreen()}>{button}</button>
    <form onSubmit={(e)=>this.handleSubmit(e)}>
      <button type="submit"  value="Submit">Search</button>
      <input id="custom" type="text" name="firstname" required style={divStyle}/>
    </form>
    {this.state.display}
    </div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,document.getElementById('app'));
