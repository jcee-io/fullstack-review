import React from 'react';

let Sort = (props) => {

  return (
    <div>
	  <button onClick={props.reset} style={{width: 90}}>Reset List</button>
	  <button onClick={props.sort} style={{width: 90}}>Created v</button>
	  <button onClick={props.reverse} style={{width: 90}}>Created ^</button>
    </div>  	
  );	

}

export default Sort