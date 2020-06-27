import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Container } from 'react-bootstrap';


const states = [
   {
      "label": "Maharashtra",
      "value": "MH"
   },
   {
      "label": "Gujarat",
      "value": "GJ"
   },
   {
      "label": "Delhi",
      "value": "DL"
   },
   {
      "label": "Rajasthan",
      "value": "RJ"
   },
   {
      "label": "Madhya Pradesh",
      "value": "MP"
   },
   {
      "label": "Tamil Nadu",
      "value": "TN"
   },
   {
      "label": "Uttar Pradesh",
      "value": "UP"
   },
   {
      "label": "Andhra Pradesh",
      "value": "AP"
   },
   {
      "label": "Telangana",
      "value": "TG"
   },
   {
      "label": "West Bengal",
      "value": "WB"
   },
   {
      "label": "Jammu and Kashmir",
      "value": "JK"
   },
   {
      "label": "Karnataka",
      "value": "KA"
   },
   {
      "label": "Kerala",
      "value": "KL"
   },
   {
      "label": "Bihar",
      "value": "BR"
   },
   {
      "label": "Punjab",
      "value": "PB"
   },
   {
      "label": "Haryana",
      "value": "HR"
   },
   {
      "label": "Odisha",
      "value": "OR"
   },
   {
      "label": "Jharkhand",
      "value": "JH"
   },
   {
      "label": "Chandigarh",
      "value": "CH"
   },
   {
      "label": "Uttarakhand",
      "value": "UT"
   },
   {
      "label": "Himachal Pradesh",
      "value": "HP"
   },
   {
      "label": "Assam",
      "value": "AS"
   },
   {
      "label": "Chhattisgarh",
      "value": "CT"
   },
   {
      "label": "Andaman and Nicobar Islands",
      "value": "AN"
   },
   {
      "label": "Ladakh",
      "value": "LA"
   },
   {
      "label": "Meghalaya",
      "value": "ML"
   },
   {
      "label": "Puducherry",
      "value": "PY"
   },
   {
      "label": "Goa",
      "value": "GA"
   },
   {
      "label": "Manipur",
      "value": "MN"
   },
   {
      "label": "Tripura",
      "value": "TR"
   },
   {
      "label": "Mizoram",
      "value": "MZ"
   },
   {
      "label": "Arunachal Pradesh",
      "value": "AR"
   },
   {
      "label": "Nagaland",
      "value": "NL"
   },
   {
      "label": "Dadra and Nagar Haveli",
      "value": "DN"
   },
   {
      "label": "Daman and Diu",
      "value": "DD"
   },
   {
      "label": "Lakshadweep",
      "value": "LD"
   },
   {
      "label": "Sikkim",
      "value": "SK"
   }
];
class DistrictWiseData extends React.Component {
   constructor(props) {
      console.log(props);
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         data: []
      }
   }
   state = {
      state: null
   }
   componentDidMount() {

      this.callService("KA");
   }
   componentDidUpdate(prevProps, prevState) {
   }

   render() {
      
      return (
         <div>

            <div style={{ position: 'fixed', width: '100%', padding: '7px', marginTop: '-10px', fontWeight: '400', backgroundImage: 'linear-gradient(180deg, #6cf15c, #62ce55)', fontSize: '14px', color: 'dimgrey' }}>
               <div className="container">
                  <div style={{ textAlign: 'left', padding: '5px' }} className="row">
                     <div className="col-md-4">Select State</div>
                  </div>
               </div>
               <div className="container">
                  <div style={{ textAlign: 'left', paddingBottom: '8px' }} className="row ">
                     <div className="col-md-4"></div>
                     <div className="col-md-4">
                        <Select readOnly onChange={this.handleChange} options={states} />
                     </div>
                     <div className="col-md-4"></div>
                  </div>
               </div>

            </div>
            {/* <StickyContainer>
               <Sticky bottomOffset={80}>{({ style }) => <h1 style={style}>Sticky element</h1>}</Sticky>
            </StickyContainer> */}
            <div style={{width: '100%'}}>
               <Table style={{ marginTop: "80px" }} striped bordered responsive borderless>
                  <tbody>
                     <tr style={{ fontWeight: "500", background: '#6f6df4', color: 'white' }}>
                        <td>Districts</td>
                        <td>Confirmed</td>
                        <td>Recovered</td>
                        <td>Deaths</td> 
                     </tr>
                     {this.renderTableData()}
                  </tbody>
               </Table>
            </div>
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

   handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(selectedOption);
      this.callService(selectedOption.value);
   }

   renderTableData() {
      return this.state.data.map((data, index) => {

         const { district, confirmed, recovered, deceased, delta } = data //destructuring
         return (
            <tr key={district}>
               <td style={{ fontSize: "12px" }}>{district}</td>
               <td style={{ fontSize: "12px" }}>{confirmed}({delta.confirmed})</td>
               <td style={{ fontSize: "12px" }}>{recovered}({delta.recovered})</td>
               <td style={{ fontSize: "12px" }}>{deceased}({delta.deceased})</td>
            </tr>
         )
      })
   }

   callService(state) {
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
            var resultantData = this.formStructure(response.data.state_wise);

            var districts = this.getDistricts(resultantData, state);
            console.log(districts);
            var resultantDistrictData = this.formStructureDistrict(districts);
            console.log(resultantDistrictData);
            var data = resultantDistrictData.sort((a, b) => a.confirmed - b.confirmed);
            data = data.reverse();
            this.setState({
               data: data
            })
         })
         .catch((error) => {
            console.log(error)
         });
   }
   formStructureDistrict(data) {
      debugger;
      var array = [];
      for (var item in data) {
         // this condition is required to prevent moving forward to prototype chain
         if (data.hasOwnProperty(item)) {
            data[item].district = item;
            array.push(data[item]);
         }

      }
      return array;
   }
   // formStructure(data) {
   //    var myData = Object.keys(data).map(key => {
   //       console.log(key);
   //       return data[key];
   //    })
   //    return myData;
   // }

   getDistricts(resultantData, state) {
      var resp = [];
      for (var i = 0; i < resultantData.length; i++) {
         if (resultantData[i].statecode == state) {
            resp = resultantData[i].district;
            break;
         }
      }
      return resp;
   }

   formStructure(data) {
      var myData = Object.keys(data).map(key => {
         return data[key];
      })
      return myData;
   }

}

export default DistrictWiseData