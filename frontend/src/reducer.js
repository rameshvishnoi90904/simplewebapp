//reducers for updating props of components
export default function reducer(state={data:[]},action){
  if(action.type === "getList"){
    state = {...state,data:action.payload}
  }else if(action.type === "search"){
  	state = {...state,data:action.payload}
  }
  return state;
}
