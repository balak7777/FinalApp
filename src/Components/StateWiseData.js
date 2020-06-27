//import FusionCharts from "fusioncharts";
//import charts from "fusioncharts/fusioncharts.charts";
//import ReactFusioncharts from "react-fusioncharts";
import React from 'react';
import axios from 'axios';
//import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Container } from 'react-bootstrap';


class StateWiseData extends React.Component {
   
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         data: []
      }
   }

   componentDidMount() {

      this.callService();
   }
   componentDidUpdate(prevProps, prevState) {
   }

   render() {
      
      return (

         <div style={{ marginTop: '-5px' }}>

            <Table striped bordered responsive borderless >
               <tbody>
                  <tr style={{ fontWeight: "500", background: '#6f6df4', color: 'white' }} fixed="top" position="relative">
                     <td>States</td>
                     <td>Confirmed</td>
                     <td>Recovered</td>
                     <td>Deaths</td> 
                  </tr>
                  {this.renderTableData()}
               </tbody>
            </Table>
            <footer className="neal-footer">
               <Container>
                  <Row>
                     <Col >
                        <small className="neal-footer-copyright">
                           Disclaimer : This information is fetched from rapidapi.com
              </small>
                     </Col>

                  </Row>
               </Container>
            </footer>
         </div>
      )
   }

   clickMe(item){
      console.log(item);
   }
   renderTableData() {
      console.log("Hello");
      return this.state.data.map((data, index) => {
         const { state, confirmed, recovered, deaths, deltaconfirmed, deltarecovered, deltadeaths } = data //destructuring
         return (
            <tr key={state}>
               <td style={{ fontSize: "12px" }}><a onClick={this.clickMe.bind(this,data.statecode)}>{state}</a></td>
               <td style={{ fontSize: "12px" }}>{confirmed}({deltaconfirmed})</td>
               <td style={{ fontSize: "12px" }}>{recovered}({deltarecovered})</td>
               <td style={{ fontSize: "12px" }}>{deaths}({deltadeaths})</td> 

            </tr>
         )
      })
   }

   callService() {
      debugger;
      axios({
         "method": "GET",
         "url": "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
         "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
            "x-rapidapi-key": "c7e9cb8f97msh0c51ebcef4e65a6p1a5983jsn2c291c51a31f"
         }
      })
         .then((response) => {
            console.log(response.data.state_wise);
            var resultantData = this.formStructure(response.data.state_wise);
            console.log(resultantData)
            var data = resultantData.sort((a, b) => a.confirmed - b.confirmed);
            data = data.reverse();
            this.setState({
               data: data
            })
         })
         .catch((error) => {
            console.log(error)
         });
   }
   formStructure(data) {
      var myData = Object.keys(data).map(key => {
         return data[key];
      })
      return myData;
   }

}


export default StateWiseData