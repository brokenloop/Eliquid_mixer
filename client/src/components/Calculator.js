import React, { Component } from 'react';
import './Calculator.css';
import Card from './Card';
import InputField from './InputField';
import SliderField from './SliderField';
import Button from './Button';
import Table from './Table';
import TableRow from './TableRow';
import RecipeName from './RecipeName';
import {recipeService} from '../services/recipe-service.js';

class Calculator extends Component {

  constructor() {
    super();
    this.url = "http://127.0.0.1:5000/";
    this.state = {
      name: "",
      numFlavours: 0,
      flavours: {},
      batchVolume: 100,
      batchNic: 6,
      batchRatio: 70,
      baseNic: 100,
      baseRatio: 0
    };
    this.weights = {
      nic: 1.01,
      vg: 1.26,
      pg: 1.038,
      flavour: 1.0
    };
  }

  addFlavour() {
    let newNumFlavours = this.state.numFlavours;
    let flavours = Object.assign({}, this.state.flavours);
    let key = newNumFlavours;
    let label = "New Flavour";
    flavours[key] = {
      key: key,
      label: label,
      percentage: 0
    };
    
    this.setState({
      numFlavours: newNumFlavours + 1,
      flavours: flavours
    });
  }

  removeFlavour(key, event) {
    let flavours = Object.assign({}, this.state.flavours);
    delete flavours[key];
    this.setState({
      flavours: flavours
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (!isNaN(Number(value))) {
      this.setState({
        [name]: value
      });
    }
  }

  handleRecipeNameChange(event) {

      const name = event.target.value;
      this.setState({
          name: name
      })
  }

  handleSliderChange(value, name) {
    this.setState({
      [name]: value
    });
  }

  handleFlavourChange(key, event) {
    if (isNaN(event.target.value)) {
      return;
    }
    let flavours = Object.assign({}, this.state.flavours);
    flavours[key][event.target.name] = event.target.value;
    this.setState({
      flavours: flavours
    })
  }

  handleLabelChange(key, event) {
    let flavours = Object.assign({}, this.state.flavours);
    flavours[key]["label"] = event.target.value;
    this.setState({
      flavours: flavours
    })
  }

  calculateVolume(percentage) {
      let volume = this.state.batchVolume * (percentage / 100);
    volume = Math.round(volume * 100) / 100;
    // volume = (volume > batchVolume) ? batchVolume : volume;
    return volume;
  }

  calculateFlavourWeight(volume) {
    return (volume * 10) / 10;
  }

  calculateNicVolume() {
    let nicVolume = (this.state.batchNic / this.state.baseNic) * this.state.batchVolume;
    nicVolume = Math.round(nicVolume * 100) / 100;
    return nicVolume;
  }

  calculateBaseNicWeight() {
    let nicPercent = this.state.baseNic / 100;
    let blendPercent = 100 - nicPercent;
    let vgPercent = this.state.baseRatio;
    let pgPercent = blendPercent - vgPercent;

    let nicWeight = (nicPercent * this.weights.nic) +
                    (vgPercent * this.weights.vg) +
                    (pgPercent * this.weights.pg);

    nicWeight = Math.round(nicWeight * 100) / 10000;
    return nicWeight;
  }

  calculateBatchNicWeight() {
    let batchNicWeight = this.calculateBaseNicWeight() * this.calculateNicVolume();
    batchNicWeight = Math.round(batchNicWeight * 100) / 100;
    return batchNicWeight;
  }

  calculateVGVolume() {
    let desiredVGVolume = this.state.batchVolume * (this.state.batchRatio / 100);
    let volumeTaken = 0;
    let nicVGVolume = this.calculateNicVolume() * (this.state.baseRatio / 100);
    volumeTaken += nicVGVolume;

    let VGVolume = desiredVGVolume - volumeTaken;
    VGVolume = Math.round(VGVolume * 100) / 100;
    return VGVolume;
  }

  calculateVGWeight() {
    let VGVolume = this.calculateVGVolume();
    let VGWeight = VGVolume * this.weights.vg;
    VGWeight = Math.round(VGWeight * 100) / 100;
    return VGWeight;
  }


  // Error here - have to rethink how we're calculating the amount of PG & VG
  calculatePGVolume() {
    let PGRatio = (100 - this.state.batchRatio) / 100;
    let desiredPGVolume = this.state.batchVolume * PGRatio;

    let volumeTaken = 0;
    let nicPGVolume = this.calculateNicVolume() * (100 - this.state.baseRatio) / 100;
    volumeTaken += nicPGVolume;
    //volumeTaken += this.calculateVGVolume();
    for (let i = 0; i < this.state.numFlavours; i++) {
        if (this.state.flavours.hasOwnProperty(i)) {
              volumeTaken += this.calculateVolume(this.state.flavours[i].percentage);
        }
    }
    let PGVolume = desiredPGVolume - volumeTaken;
    PGVolume = Math.round(PGVolume * 100) / 100;

    return PGVolume;
  }

  calculatePGWeight() {
    let PGVolume = this.calculatePGVolume();
    let PGWeight = PGVolume * this.weights.pg;
    PGWeight = Math.round(PGWeight * 100) / 100;
    return PGWeight;
  }

  generateFlavourInputList() {
    let flavourInputList = [];
    for (let i = 0; i < this.state.numFlavours; i++) {
      if (this.state.flavours.hasOwnProperty(i)) {
        let flavourObject = this.state.flavours[i];
        let flavourComponent = <InputField
          key={flavourObject.key}
          inputId={flavourObject.key}
          name={"percentage"}
          onChange={this.handleFlavourChange.bind(this)}
          onLabelChange={this.handleLabelChange.bind(this)}
          label={flavourObject.label}
          placeholder={flavourObject.percentage}
          buttonAction={this.removeFlavour.bind(this)}
          editable={true}
          symbol="%"/>;
        flavourInputList.push(flavourComponent);
      }
    }
    return flavourInputList;
  }

  generateFlavourOutputList() {
    let flavourOutputList = [];
    for (let i = 0; i < this.state.numFlavours; i++) {
      if (this.state.flavours.hasOwnProperty(i)) {
        let flavourObject = this.state.flavours[i];
        let volume = this.calculateVolume(flavourObject.percentage);
        let outputComponent = <TableRow
          key={flavourObject.key}
          ingredient={flavourObject.label}
          volume={volume}
          weight={this.calculateFlavourWeight(volume)}/>;
        flavourOutputList.push(outputComponent);
      }
    }
    return flavourOutputList;
  }

  validateOutput() {
    let result = (this.calculatePGVolume() >= 0 && this.calculateVGVolume() >= 0);
    return result;
      // alert("Invalid recipe! Please review your ingredient ratios.");
      // this.setState({
      //   validRecipe: false
      // });
  }

  mapResultToRecipe(result) {
      let flavours = result.flavours.map((elem, index) => {
          return {
              key: index,
            label: elem.name,
            percentage: elem.percentage
          };
      });
      var recipe = {
          name: result.name,
          numFlavours: result.flavours.length,
        flavours: flavours,
        batchVolume: result.batchvolume,
        batchNic: result.batchnic,
        batchRatio: result.batchratio,
        baseNic: result.basenic,
        baseRatio: result.baseratio
      }
      return recipe;
  }

  loadRecipe() {
    let recipeName = this.props.match.params.recipename;
    if (recipeName) {
      recipeService.loadRecipe(recipeName)
      .then(recipe => {
        this.setState(this.mapResultToRecipe(recipe));
      })
      .catch(_ => {
        this.props.history.push('/')
      });
    }
  }

    componentDidMount() {
          this.loadRecipe();
    }



  render() {
    let valid = this.validateOutput();
    let flavourInputList = this.generateFlavourInputList();
    let flavourOutputList = this.generateFlavourOutputList();

    return (
      <div className="Calculator">
        <div className="container">
          <div className="topSection">
              <div className="leftSection">
              {valid ? (
                null 
              ) : (
                <div className="warning">
                  <Card className="warning" cardHeader="Warning!">
                    <p>Invalid recipe! Please review your ingredient ratios.</p>
                  </Card>
                </div>
              )}
              <RecipeName onChange={this.handleRecipeNameChange.bind(this)} name={this.state.name}/>
              <Card cardHeader="Batch Info">
                      <InputField
                  label="Volume"
                  name="batchVolume"
                  filter="text"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="ml"
                  placeholder={this.state.batchVolume}/>
                      <InputField
                  label="Nicotine"
                  name="batchNic"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="mg"
                  placeholder={this.state.batchNic}/>
                      <SliderField
                  label="VG Ratio"
                  name="batchRatio"
                  onChange={this.handleSliderChange.bind(this)}
                  symbol="%VG"
                  placeholder={this.state.batchRatio}/>
                  </Card>
              <Card cardHeader="Nicotine Base">
                <InputField
                  label="Nicotine"
                  name="baseNic"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="mg"
                  placeholder={this.state.baseNic}/>
                <SliderField
                  label="VG Ratio"
                  name="baseRatio"
                  onChange={this.handleSliderChange.bind(this)}
                  placeholder={this.state.baseRatio}/>
              </Card>
              <Card cardHeader="Flavours">
                {flavourInputList}
                <Button onClick={this.addFlavour.bind(this)} action="add">+ Add Flavour</Button>
              </Card>
              <Card cardHeader="Output">
                <Table>
                  <TableRow
                    ingredient="Nicotine Base"
                    volume={this.calculateNicVolume()}
                    weight={this.calculateBatchNicWeight()}/>
                  <TableRow
                    ingredient="PG"
                    volume={this.calculatePGVolume()}
                    weight={this.calculatePGVolume()}/>
                  <TableRow
                    ingredient="VG"
                    volume={this.calculateVGVolume()}
                    weight={this.calculateVGWeight()}/>
                  {flavourOutputList}
                </Table>
              </Card>
              <button className="saveButton" onClick={(e) => recipeService.saveRecipe(this.state)}>Save Recipe</button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Calculator;
