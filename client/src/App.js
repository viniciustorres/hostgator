// CSS Includes
import './App.css';

import React, {Component} from 'react';

/* Importing form controls */
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

/* Importing extra components from the material-UI */
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';

/* SVG Image loading */
import HostgatorLogo from './hostgator-logo.svg';
import PlanoIcon from './Grupo 29910.svg';
import IconCheck from './icon-check.svg';
import DeskImage from './Grupo 29995.svg';
import DeveloperImage from './Grupo 29996.svg';

import Montserrat from './Montserrat-Regular.woff';

class App extends Component {

  constructor(props){
    super(props);

    const promocode = 'PROMOHG40';

    // Initializing the states
    this.state = {
      products : {},
      selectedPeriod : 'triennially',
      promocode : promocode
    }
  }  

  onChangeProductPeriod = (event) => {
    this.setState({ selectedPeriod : event.target.value })
  }

  // Method which get all products from API.
  getProducts(){
    fetch('http://localhost:8080/prices')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ products : responseJson.shared.products })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Returns the product price with the discount value based on the information of percentage.
  getProductWithDiscount(value, percent) {
    return value * (1 - percent / 100);
  }

  componentDidMount(){    
    this.getProducts();
  }

  render () {    
    //console.log("AA -> ",this.state.products);    
    //console.log(Object.entries(this.state.products).length);

    return (
      <div className="App">

        <Container className="barraTopo" maxWidth="false">
          <Container fixed className="containerLogoTop">
            <img src={HostgatorLogo}/>
          </Container>

          <Grid container item lg={12} className="backgroundTopo">
            <Grid container item lg={4} className="deskImageContainer">
              <img className="deskImage" src={DeskImage}/>
            </Grid>

            <Grid container item lg={4}>
            <section>

              <p className="backgroundTopoDescription">Hospedagem de Sites</p>

              <h1 className="backgroundTopoTitle">Tenha uma hospedaegm de sites estável e eviteperder visitantes diariamente</h1>

              <img src={IconCheck}/>
              <h2 className="backgroundTopoDescription">99,9% de disponibilidade: seu site sempre no ar</h2>
              <br/>
              <img src={IconCheck}/>
              <h2 className="backgroundTopoDescription">Suporte 24h, todos os dias</h2>
              <img src={IconCheck}/>
              <h2 className="backgroundTopoDescription">Painel de Controle cPanel</h2>

            </section>
            </Grid>

            <Grid container item lg={4} className="developerImageContainer">
              <img src={DeveloperImage}/>
            </Grid>

          </Grid>

         

          <form className="formPeriodicity">
            <FormControl className="formPeriod" component="fieldset">
              <FormLabel component="legend">Quero pagar a cada</FormLabel>
              <RadioGroup className="radioGroupContainer" style={{display : 'flex', flexDirection : 'row' }} aria-label="contract" name="contract1" value={this.state.selectedPeriod} onChange={this.onChangeProductPeriod}>
                <FormControlLabel value="triennially" labelPlacement="end" control={<Radio color="primary" />} label="3 anos" />
                <FormControlLabel value="annually" labelPlacement="end" control={<Radio color="primary" />} label="1 ano" />
                <FormControlLabel value="monthly" control={<Radio color="primary" />} label="1 mês" />          
              </RadioGroup>
            </FormControl>
          </form>


          <Grid container item lg={12} justify="center">
            
            <Grid container item xs={12} lg={2} justify="center">
              <div className="planoCardContainer">
                <div className="planoCardHeader">

                  
                  <img className="planoIcon" src={PlanoIcon}/>
                  
                  <h2 className="planoHeader">{ Object.entries(this.state.products).length > 0 ? this.state.products.planoM.name : '-' }</h2>
                </div>
                <div className="planoCardBody">
                  <p>
                    <strike style={{ marginRight : '10px' }}>R$ { Object.entries(this.state.products).length > 0 ? this.state.products.planoM.cycle[this.state.selectedPeriod].priceOrder.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits : 2})  : '-' }</strike> 
                    <strong>R$ { Object.entries(this.state.products).length > 0 ? this.getProductWithDiscount(this.state.products.planoM.cycle[this.state.selectedPeriod].priceOrder,40).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits : 2}) : '-' }</strong>
                  </p>
                  equivalente a &nbsp; 

                  <div>
                    <span className="labelAzul">R$</span> 
                    <span className="destaquePrecoMensal"> { Object.entries(this.state.products).length > 0 ? (this.getProductWithDiscount(this.state.products.planoM.cycle[this.state.selectedPeriod].priceOrder,40) / this.state.products.planoM.cycle[this.state.selectedPeriod].months).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits : 2}) : '-' } </span> 
                    <span className="labelAzul">/mês*</span>
                  </div>

                  <a onClick={event => window.location.href = '/?a=add&pid'+this.state.products.planoM.id+'&billingcycle='+this.state.selectedPeriod+'&promocode='+this.state.promocode}>
                    <Button variant="contained" fullWidth="true" className="btnContrateAgora">Contrate agora</Button>
                  </a>

                  <p>1 ano de domínio grátis <InfoIcon className="infoIcon" fontSize="small"/></p> 
                  
                  economize R$ { Object.entries(this.state.products).length > 0 ? (this.state.products.planoM.cycle[this.state.selectedPeriod].priceOrder - this.getProductWithDiscount(this.state.products.planoM.cycle[this.state.selectedPeriod].priceOrder,40)).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits : 2}) : '-' } 

                  <Chip label="40% OFF" className="chipDesconto"/>

                </div>
                <div className="planoCardFooter">
                  <span className="textDashed">Sites ilimitados</span> <br/>
                  <span><strong>100 GB </strong>de Armazenamento</span> <br/>
                  <span className="textDashed">Contas de E-mail <strong>ilimitadas</strong></span> <br/>
                  <span>Criador de Sites </span><span style={{fontWeight : 'bold', textDecoration : 'underline'}}>Grátis</span> <br/>
                  <span>Certificado SSL <strong>Grátis</strong> (https)</span> <br/>
                </div>

              </div>
            </Grid>
            
          </Grid>
        </Container>

      </div>
    );

  }
}

export default App;
