import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Row, Col, Container } from 'react-bootstrap';

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
            <div style={{  width: '100%', padding : '7px', marginTop: '-10px', fontWeight: '400', textAlign: 'left', backgroundImage: 'linear-gradient(180deg, #6cf15c, #62ce55)', color: 'dimgrey', fontSize: '12px'}}>
            <div className="container">
               <div style={{padding: '5px'}}className="row">
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
            </div>
            <ReactFusioncharts style={{ marginTop: "100px"}}
               type="msline"
               width="100%"
               // height="100%"
               dataFormat="JSON"
               dataSource={dataSource}
            />
            <Table striped bordered hover>
               <tbody>
                  <tr style={{ fontWeight: "500" }}>
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
                Disclaimer : This information is fetched from api.covid19api.com
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
      
      axios.get('https://api.covid19api.com/country/' + country).then(response => {
         console.log(response);
         //if(response.message != undefined && response.message !== "Not Found"){
         let countryResp = response.data;
         let countryRespLen = countryResp.length;
         var rec = [];
         for (var i = 0; i < 14; i++) {
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
               theme: "candy",
               "paletteColors": "#ffa751, #fef200, #04b000, #ae1d08",
               // "showBorder": 0,
               "bgAlpha": 50,
               "canvasBgAlpha": 0,
               "canvasBorderAlpha": 0,
               "lineThickness": "2",
               "valueFontColor": "#000000",
               "valueFontSize": 7,
               showAlternateHGridColor: 0,
               valueAlpha: 0,
               crossLineAlpha: 0,
               legendPosition: "bottom",
               "showAlternateVGridColor": "0",
               "divLineAlpha": 10,
               "legendItemFontBold": 0,
               "legendBgAlpha": 0,
               "legendBorderAlpha": 0,
               "drawCustomLegendIcon": 1,
               "legendIconSides": 6,
               alignLegendWithCanvas: 1,
               showValues:0,
               "legendIconBorderThickness": 3,
               numberScaleUnit: "K, L, Cr",
               numberScaleValue: "1000,100,100",
               showBorder:1,
               chartLeftMargin: "5",
               bgColor : "#FFFFFF"
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
      
      axios.get('https://api.covid19api.com/countries').then(response => {
         console.log(response.data);
          this.formDropDown(response.data);
      });
   }
   formDropDown(data) {
      
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
      
      if(data[0] == undefined){
         datasetArr = [];
         tconf = "-";
         tactive = "-";
         trec = "-";
         tdeath = "-";
      }else{
         for (var i = 0; i < datalen; i++) {
            console.log(data);
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
      }
      
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
      if(data[0] == undefined){

      }else{
         for (var i = 0; i < datalen; i++) {
            var labelobj = {};
            labelobj.label = this.formatDate(data[i].Date);
            catobj.category.push(labelobj);
         }
      }
      
      catobjArr.push(catobj);
      return catobjArr;
   }
}

var countries = [{"label":"India","value":"india"},{"label":"Pakistan","value":"pakistan"},{"label":"Italy","value":"italy"},{"label":"Spain","value":"spain"},{"label":"Namibia","value":"namibia"},{"label":"Singapore","value":"singapore"},{"label":"Svalbard and Jan Mayen Islands","value":"svalbard-and-jan-mayen-islands"},{"label":"Gibraltar","value":"gibraltar"},{"label":"Grenada","value":"grenada"},{"label":"Latvia","value":"latvia"},{"label":"South Sudan","value":"south-sudan"},{"label":"Ethiopia","value":"ethiopia"},{"label":"French Southern Territories","value":"french-southern-territories"},{"label":"Liechtenstein","value":"liechtenstein"},{"label":"Vanuatu","value":"vanuatu"},{"label":"French Polynesia","value":"french-polynesia"},{"label":"Turkmenistan","value":"turkmenistan"},{"label":"Algeria","value":"algeria"},{"label":"Chad","value":"chad"},{"label":"Thailand","value":"thailand"},{"label":"Haiti","value":"haiti"},{"label":"Liberia","value":"liberia"},{"label":"Saint Helena","value":"saint-helena"},{"label":"Cameroon","value":"cameroon"},{"label":"United Kingdom","value":"united-kingdom"},{"label":"Northern Mariana Islands","value":"northern-mariana-islands"},{"label":"Slovakia","value":"slovakia"},{"label":"Somalia","value":"somalia"},{"label":"Tunisia","value":"tunisia"},{"label":"Australia","value":"australia"},{"label":"Congo (Brazzaville)","value":"congo-brazzaville"},{"label":"Congo (Kinshasa)","value":"congo-kinshasa"},{"label":"Libya","value":"libya"},{"label":"Portugal","value":"portugal"},{"label":"Uganda","value":"uganda"},{"label":"Lebanon","value":"lebanon"},{"label":"Malta","value":"malta"},{"label":"Virgin Islands, US","value":"virgin-islands"},{"label":"Cayman Islands","value":"cayman-islands"},{"label":"Croatia","value":"croatia"},{"label":"Luxembourg","value":"luxembourg"},{"label":"Marshall Islands","value":"marshall-islands"},{"label":"Macao, SAR China","value":"macao-sar-china"},{"label":"Netherlands","value":"netherlands"},{"label":"Belize","value":"belize"},{"label":"Bosnia and Herzegovina","value":"bosnia-and-herzegovina"},{"label":"Isle of Man","value":"isle-of-man"},{"label":"Jamaica","value":"jamaica"},{"label":"Kiribati","value":"kiribati"},{"label":"Puerto Rico","value":"puerto-rico"},{"label":"Bangladesh","value":"bangladesh"},{"label":"France","value":"france"},{"label":"Tanzania, United Republic of","value":"tanzania"},{"label":"Burkina Faso","value":"burkina-faso"},{"label":"Finland","value":"finland"},{"label":"Moldova","value":"moldova"},{"label":"Bolivia","value":"bolivia"},{"label":"Kyrgyzstan","value":"kyrgyzstan"},{"label":"Niger","value":"niger"},{"label":"Switzerland","value":"switzerland"},{"label":"Chile","value":"chile"},{"label":"Ireland","value":"ireland"},{"label":"Anguilla","value":"anguilla"},{"label":"Greece","value":"greece"},{"label":"Nicaragua","value":"nicaragua"},{"label":"Comoros","value":"comoros"},{"label":"Eritrea","value":"eritrea"},{"label":"Malaysia","value":"malaysia"},{"label":"New Caledonia","value":"new-caledonia"},{"label":"Tokelau","value":"tokelau"},{"label":"Honduras","value":"honduras"},{"label":"Mayotte","value":"mayotte"},{"label":"Zambia","value":"zambia"},{"label":"Canada","value":"canada"},{"label":"Ghana","value":"ghana"},{"label":"Republic of Kosovo","value":"kosovo"},{"label":"Armenia","value":"armenia"},{"label":"Austria","value":"austria"},{"label":"Denmark","value":"denmark"},{"label":"Martinique","value":"martinique"},{"label":"Réunion","value":"réunion"},{"label":"Kenya","value":"kenya"},{"label":"Samoa","value":"samoa"},{"label":"Yemen","value":"yemen"},{"label":"Bhutan","value":"bhutan"},{"label":"Brazil","value":"brazil"},{"label":"Papua New Guinea","value":"papua-new-guinea"},{"label":"Seychelles","value":"seychelles"},{"label":"Barbados","value":"barbados"},{"label":"Burundi","value":"burundi"},{"label":"Central African Republic","value":"central-african-republic"},{"label":"Nigeria","value":"nigeria"},{"label":"Saint Pierre and Miquelon","value":"saint-pierre-and-miquelon"},{"label":"Estonia","value":"estonia"},{"label":"Syrian Arab Republic (Syria)","value":"syria"},{"label":"Benin","value":"benin"},{"label":"Iran, Islamic Republic of","value":"iran"},{"label":"Korea (South)","value":"korea-south"},{"label":"Taiwan, Republic of China","value":"taiwan"},{"label":"Monaco","value":"monaco"},{"label":"Saint-Martin (French part)","value":"saint-martin-french-part"},{"label":"Belgium","value":"belgium"},{"label":"Costa Rica","value":"costa-rica"},{"label":"Faroe Islands","value":"faroe-islands"},{"label":"Fiji","value":"fiji"},{"label":"Mexico","value":"mexico"},{"label":"Tonga","value":"tonga"},{"label":"Uzbekistan","value":"uzbekistan"},{"label":"Saint Kitts and Nevis","value":"saint-kitts-and-nevis"},{"label":"Sao Tome and Principe","value":"sao-tome-and-principe"},{"label":"Andorra","value":"andorra"},{"label":"Guinea","value":"guinea"},{"label":"Kazakhstan","value":"kazakhstan"},{"label":"Mali","value":"mali"},{"label":"Norway","value":"norway"},{"label":"Slovenia","value":"slovenia"},{"label":"Solomon Islands","value":"solomon-islands"},{"label":"El Salvador","value":"el-salvador"},{"label":"Macedonia, Republic of","value":"macedonia"},{"label":"Morocco","value":"morocco"},{"label":"Niue","value":"niue"},{"label":"Afghanistan","value":"afghanistan"},{"label":"British Virgin Islands","value":"british-virgin-islands"},{"label":"Panama","value":"panama"},{"label":"Saint Vincent and Grenadines","value":"saint-vincent-and-the-grenadines"},{"label":"Sierra Leone","value":"sierra-leone"},{"label":"Germany","value":"germany"},{"label":"Montserrat","value":"montserrat"},{"label":"San Marino","value":"san-marino"},{"label":"South Africa","value":"south-africa"},{"label":"Western Sahara","value":"western-sahara"},{"label":"Qatar","value":"qatar"},{"label":"Cuba","value":"cuba"},{"label":"French Guiana","value":"french-guiana"},{"label":"Sweden","value":"sweden"},{"label":"Christmas Island","value":"christmas-island"},{"label":"Mozambique","value":"mozambique"},{"label":"Wallis and Futuna Islands","value":"wallis-and-futuna-islands"},{"label":"Holy See (Vatican City State)","value":"holy-see-vatican-city-state"},{"label":"Timor-Leste","value":"timor-leste"},{"label":"Viet Nam","value":"vietnam"},{"label":"Belarus","value":"belarus"},{"label":"Cook Islands","value":"cook-islands"},{"label":"Gabon","value":"gabon"},{"label":"Jordan","value":"jordan"},{"label":"Myanmar","value":"myanmar"},{"label":"Saint-Barthélemy","value":"saint-barthélemy"},{"label":"Botswana","value":"botswana"},{"label":"Peru","value":"peru"},{"label":"Romania","value":"romania"},{"label":"Aruba","value":"aruba"},{"label":"Hong Kong, SAR China","value":"hong-kong-sar-china"},{"label":"Israel","value":"israel"},{"label":"Lesotho","value":"lesotho"},{"label":"Cape Verde","value":"cape-verde"},{"label":"Cyprus","value":"cyprus"},{"label":"Guatemala","value":"guatemala"},{"label":"Paraguay","value":"paraguay"},{"label":"Uruguay","value":"uruguay"},{"label":"China","value":"china"},{"label":"United States of America","value":"united-states"},{"label":"Angola","value":"angola"},{"label":"Colombia","value":"colombia"},{"label":"Guyana","value":"guyana"},{"label":"Lao PDR","value":"lao-pdr"},{"label":"Ukraine","value":"ukraine"},{"label":"Argentina","value":"argentina"},{"label":"Azerbaijan","value":"azerbaijan"},{"label":"Brunei Darussalam","value":"brunei"},{"label":"Guadeloupe","value":"guadeloupe"},{"label":"Guernsey","value":"guernsey"},{"label":"Philippines","value":"philippines"},{"label":"Bermuda","value":"bermuda"},{"label":"Mauritius","value":"mauritius"},{"label":"United Arab Emirates","value":"united-arab-emirates"},{"label":"Dominica","value":"dominica"},{"label":"Heard and Mcdonald Islands","value":"heard-and-mcdonald-islands"},{"label":"Cambodia","value":"cambodia"},{"label":"Czech Republic","value":"czech-republic"},{"label":"Hungary","value":"hungary"},{"label":"Mongolia","value":"mongolia"},{"label":"Suriname","value":"suriname"},{"label":"Djibouti","value":"djibouti"},{"label":"Japan","value":"japan"},{"label":"Nepal","value":"nepal"},{"label":"New Zealand","value":"new-zealand"},{"label":"Zimbabwe","value":"zimbabwe"},{"label":"Albania","value":"albania"},{"label":"Iraq","value":"iraq"},{"label":"Oman","value":"oman"},{"label":"Poland","value":"poland"},{"label":"Bouvet Island","value":"bouvet-island"},{"label":"Equatorial Guinea","value":"equatorial-guinea"},{"label":"Micronesia, Federated States of","value":"micronesia"},{"label":"Ecuador","value":"ecuador"},{"label":"Jersey","value":"jersey"},{"label":"Maldives","value":"maldives"},{"label":"Norfolk Island","value":"norfolk-island"},{"label":"American Samoa","value":"american-samoa"},{"label":"Egypt","value":"egypt"},{"label":"Mauritania","value":"mauritania"},{"label":"Togo","value":"togo"},{"label":"Dominican Republic","value":"dominican-republic"},{"label":"Korea (North)","value":"korea-north"},{"label":"Cocos (Keeling) Islands","value":"cocos-keeling-islands"},{"label":"Kuwait","value":"kuwait"},{"label":"Nauru","value":"nauru"},{"label":"Senegal","value":"senegal"},{"label":"Venezuela (Bolivarian Republic)","value":"venezuela"},{"label":"Bulgaria","value":"bulgaria"},{"label":"South Georgia and the South Sandwich Islands","value":"south-georgia-and-the-south-sandwich-islands"},{"label":"Sri Lanka","value":"sri-lanka"},{"label":"Swaziland","value":"swaziland"},{"label":"Sudan","value":"sudan"},{"label":"Tajikistan","value":"tajikistan"},{"label":"Bahrain","value":"bahrain"},{"label":"British Indian Ocean Territory","value":"british-indian-ocean-territory"},{"label":"Côte d'Ivoire","value":"cote-divoire"},{"label":"Iceland","value":"iceland"},{"label":"Rwanda","value":"rwanda"},{"label":"Saudi Arabia","value":"saudi-arabia"},{"label":"Pitcairn","value":"pitcairn"},{"label":"Turks and Caicos Islands","value":"turks-and-caicos-islands"},{"label":"Falkland Islands (Malvinas)","value":"falkland-islands-malvinas"},{"label":"Guam","value":"guam"},{"label":"Madagascar","value":"madagascar"},{"label":"Montenegro","value":"montenegro"},{"label":"Tuvalu","value":"tuvalu"},{"label":"Palau","value":"palau"},{"label":"Indonesia","value":"indonesia"},{"label":"Malawi","value":"malawi"},{"label":"ALA Aland Islands","value":"ala-aland-islands"},{"label":"Palestinian Territory","value":"palestine"},{"label":"Russian Federation","value":"russia"},{"label":"Turkey","value":"turkey"},{"label":"Bahamas","value":"bahamas"},{"label":"Georgia","value":"georgia"},{"label":"Trinidad and Tobago","value":"trinidad-and-tobago"},{"label":"US Minor Outlying Islands","value":"us-minor-outlying-islands"},{"label":"Antigua and Barbuda","value":"antigua-and-barbuda"},{"label":"Gambia","value":"gambia"},{"label":"Lithuania","value":"lithuania"},{"label":"Guinea-Bissau","value":"guinea-bissau"},{"label":"Saint Lucia","value":"saint-lucia"},{"label":"Serbia","value":"serbia"},{"label":"Antarctica","value":"antarctica"},{"label":"Netherlands Antilles","value":"netherlands-antilles"}];

export default MyGraphComponent