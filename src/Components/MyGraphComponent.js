import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Table, Row, Col, Container } from 'react-bootstrap';

// Resolves charts dependancy
charts(FusionCharts);


var dataSource = "";
var selectedOption = "";
var countriesArr = "";
var tconf = "";
var tactive = "";
var trec = "";
var tdeath = "";
const navStyle = {
   background: '#e2e0a1'
};

var countries = [
   { label: "India", value: "india" },
   { label: "Spain", value: "spain" },
   { label: "Italy", value: "italy" },
   { label: "Germany", value: "germany" },
   { label: "Turkey", value: "turkey" },
   { label: "Iran", value: "iran" },
   
   { label: "Russia", value: "russia" },
   { label: "Brazil", value: "brazil" },
   { label: "Canada", value: "canada" },
   { label: "Pakistan", value: "pakistan" },
   { label: "Nepal", value: "nepal" },
   { label: "Bhutan", value: "bhutan" },
   { label: "Sri lanka", value: "sri lanka" }
];

class MyGraphComponent extends React.Component {

   state = {
      selectedOption: null,
      dataSource: null,
      countries: null,
      tconf: null,
      tactive: null,
      trec: null,
      tdeath: null
   }
   componentDidMount() {
      
      this.callService("india");
   }
   componentDidUpdate(prevProps, prevState) {
   }

   render() {

      return (
         <div>
            
            <div className="container">
               <div className="row">
                  <div className="col-md-4">Select Country</div>
               </div>
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                     <Select readOnly onChange={this.handleChange} options={countries} />
                  </div>
                  <div className="col-md-4"></div>
               </div>
            </div>
            <ReactFusioncharts
               type="msline"
               width="100%"
               // height="100%"
               dataFormat="JSON"
               dataSource={dataSource}
            />
            <Table striped bordered hover>
               <tbody>
                  <tr>
                     <td>Confirmed</td>
                     <td>Active</td>
                     <td>Recovered</td>
                     <td>Death</td>
                  </tr>
                  <tr>
                     <td>{tconf}</td>
                     <td>{tactive}</td>
                     <td>{trec}</td>
                     <td>{tdeath}</td>
                  </tr>
               </tbody>
            </Table>
            <footer className="neal-footer">
        <Container>
          <Row>
            <Col >
              <small className="neal-footer-copyright">
                © This information is fetched from api.covid19api.com
              </small>
            </Col>
            
          </Row>
        </Container>
      </footer>
         </div>
      );
   }

   handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(selectedOption);
      this.callService(selectedOption.value);
   }
   callService(country) {
      debugger;
      axios.get('https://api.covid19api.com/country/' + country).then(response => {
         console.log(response);
         //if(response.message != undefined && response.message !== "Not Found"){
         let countryResp = response.data;
         let countryRespLen = countryResp.length;
         var rec = [];
         for (var i = 0; i < 7; i++) {
            rec.push(countryResp.pop());
         }
         var data = rec.reverse();
         var dataset = this.formDataArray(data);
         var catset = this.formCategories(data);
         dataSource = {
            chart: {
               caption: "Corona Cases in " + country.toUpperCase(),
               //yaxisname: "No. of Cases",
               subcaption: "",
               showhovereffect: "1",
               numbersuffix: "",
               drawcrossline: "0",
               plottooltext: "<b>$dataValue</b> are $seriesName",
               theme: "fusion",
               "paletteColors": "#ffa751, #fef200, #04b000, #ae1d08",
               "showBorder": 0,
               "bgAlpha": 0,
               "canvasBgAlpha": 0,
               "canvasBorderAlpha": 0,
               "lineThickness": "1",
               "valueFontColor": "#000000",
               "valueFontSize": 10,
               "showAlternateVGridColor": "0",
               "divLineAlpha": 100,
               "legendItemFontBold": 0,
               "legendBgAlpha": 0,
               "legendBorderAlpha": 0,
               "drawCustomLegendIcon": 1,
               "legendIconSides": 0,
               "legendIconBorderThickness": 3,
               numberScaleUnit: "K, L, Cr",
               numberScaleValue: "1000,100,100"
            },
            categories: catset,
            dataset: dataset
         };
         console.log(dataSource);
         this.setState(
            {
               selectedOption: this.selectedOption,
               dataSource: this.dataSource,
               countries: this.countriesArr,
               tconf : this.tconf,
               tactive : this.tactive,
               trec : this.trec,
               tdeath : this.tdeath
            }
         )
         //this.setYesRecord(data[6])
         //}
         this.callServiceForCountries();
      });
   }
   setYesRecord(data) {
      debugger;
      console.log(data);
      this.setState({
         tconf: data.Confirmed,
         tactive: data.Active,
         trec: data.Recovered,
         tdeath: data.Deaths
      })
   }
   callServiceForCountries() {
      debugger;
      axios.get('https://api.covid19api.com/countries').then(response => {
         console.log(response.data);
          this.formDropDown(response.data);
      });
   }
   formDropDown(data) {
      debugger;
      var countriesArr = [];
      var datalen = data.length;
      for (var i = 0; i < datalen; i++) {
         var obj = {};
         obj.label = data[i].Country;
         obj.value = data[i].Slug;
         countriesArr.push(obj);
      }
      this.setState({
         countries: this.countriesArr
      })
   }
   formDataArray(data) {

      var datasetArr = [];
      var datalen = data.length;
      var confirmobj = {};
      confirmobj.seriesname = "Confirmed";
      confirmobj.data = [];
      var activeobj = {};
      activeobj.seriesname = "Active";
      activeobj.data = [];
      var recoveredobj = {};
      recoveredobj.seriesname = "Recovered";
      recoveredobj.data = [];
      var deathobj = {};
      deathobj.seriesname = "Death";
      deathobj.data = [];

      var dataset = [];
      for (var i = 0; i < datalen; i++) {

         confirmobj.data.push({
            "value": data[i].Confirmed
         });
         activeobj.data.push({
            "value": data[i].Confirmed - data[i].Recovered - data[i].Deaths
         });
         recoveredobj.data.push({
            "value": data[i].Recovered
         });
         deathobj.data.push({
            "value": data[i].Deaths
         });
         tconf = data[i].Confirmed;
         tactive = data[i].Confirmed - data[i].Recovered - data[i].Deaths;
         trec = data[i].Recovered;
         tdeath = data[i].Deaths;
      }
      datasetArr.push(confirmobj, activeobj, recoveredobj, deathobj);
      return datasetArr;
   }
   formatDate(date) {
      var resp = new Date(Date.parse(date)).toDateString().split(" ")[1] + " " + new Date(Date.parse(date)).toDateString().split(" ")[2];
      return resp;
   }
   formCategories(data) {
      var datalen = data.length;
      var catobjArr = [];
      var catobj = {};
      catobj.category = [];
      for (var i = 0; i < datalen; i++) {
         var labelobj = {};
         labelobj.label = this.formatDate(data[i].Date);
         catobj.category.push(labelobj);
      }
      catobjArr.push(catobj);
      return catobjArr;
   }
}

export default MyGraphComponent