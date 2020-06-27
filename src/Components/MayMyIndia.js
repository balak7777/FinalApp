import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class MapMyIndia extends React.Component {
   
   componentDidMount() {
      console.log("Component did Mount");
      
   }
   componentDidUpdate(prevProps, prevState) {
      console.log("Component did Update");
      
   }
   render() {
      
      return (
         
         <iframe id="frame" src="https://maps.mapmyindia.com/corona" onLoad={this.afterLoad} style={{width:"100%",height:"666px",float:"right"}}></iframe>
         
      );
      
   }
   afterLoad(){
      console.log("on load");
      
   }


}



export default MapMyIndia