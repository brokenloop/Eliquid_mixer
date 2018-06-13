import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import InputField from './InputField';
import Button from './Button';
import Table from './Table';
import TableRow from './TableRow';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      numFlavours: 0,
      flavours: [],
      batchVolume: 30,
      batchNic: 6,
      batchRatio: 70,
      baseNic: 72,
      baseRatio: 0,
      ingredients: {
        nic: 1.01,
        vg: 1.26,
        pg: 1.038,
        flavour: 1.0
      }
    };
  }

  addFlavour(event) {
    var newNumFlavours = this.state.numFlavours;
    var flavours = this.state.flavours.slice(0);
    flavours.push({
      key: newNumFlavours,
      label: "New Flavour",
      percentage: 0
    })
    this.setState({
      numFlavours: newNumFlavours + 1,
      flavours: flavours
    });
  }

  removeFlavour(key, event) {
    var flavours = this.state.flavours.slice(0);
    for (var i = 0; i < flavours.length; i++) {
      if (flavours[i].key === key) {
        flavours.splice(i, 1);
      }
    }
    this.setState({
      flavours: flavours
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFlavourChange(key, event) {
    var flavours = this.state.flavours.slice(0);
    for (var i = 0; i < flavours.length; i++) {
      if (flavours[i].key === key) {
        flavours[i][event.target.name] = event.target.value;
      }
    }
    this.setState({
      flavours: flavours
    })
  }

  // This is horrible and should be changed immediately
  // name and name2 etc. Shameful
  handleLabelChange(key, event) {
    var flavours = this.state.flavours.slice(0);
    for (var i = 0; i < flavours.length; i++) {
      if (flavours[i].key === key) {
        flavours[i]["label"] = event.target.value;
      }
    }
    this.setState({
      flavours: flavours
    })
  }

  calculateVolume(percentage) {
    var volume = this.state.batchVolume * (percentage / 100);
    volume = Math.round(volume * 100) / 100;
    // volume = (volume > batchVolume) ? batchVolume : volume;
    return volume;
  }

  calculateFlavourWeight(volume) {
    return (volume * 10) / 10;
  }

  calculateNicVolume() {
    var nicVolume = (this.state.batchNic / this.state.baseNic) * this.state.batchVolume;
    nicVolume = Math.round(nicVolume * 100) / 100;
    return nicVolume;
  }

  calculateBaseNicWeight() {
    var nicPercent = this.state.baseNic / 100;
    var blendPercent = 100 - nicPercent;
    var vgPercent = this.state.baseRatio;
    var pgPercent = blendPercent - vgPercent;

    var nicWeight = (nicPercent * this.state.ingredients.nic) +
                    (vgPercent * this.state.ingredients.vg) +
                    (pgPercent * this.state.ingredients.pg);

    nicWeight = Math.round(nicWeight * 100) / 10000;
    return nicWeight;
  }

  calculateBatchNicWeight() {
    var batchNicWeight = this.calculateBaseNicWeight() * this.calculateNicVolume();
    batchNicWeight = Math.round(batchNicWeight * 100) / 100;
    return batchNicWeight;
  }

  calculateVGVolume() {
    var VGVolume = this.state.batchVolume * this.state.batchRatio;
    VGVolume = Math.round(VGVolume * 100) / 10000;
    return VGVolume;
  }

  calculateVGWeight() {
    var VGVolume = this.calculateVGVolume();
    var VGWeight = VGVolume * this.state.ingredients.vg;
    VGWeight = Math.round(VGWeight * 100) / 100;
    return VGWeight;
  }

  calculatePGVolume() {
    var volumeTaken = 0;
    volumeTaken += this.calculateNicVolume();
    volumeTaken += this.calculateVGVolume();
    for (var i = 0; i < this.state.flavours.length; i++) {
      volumeTaken += this.calculateVolume(this.state.flavours[i].percentage);
    }
    var PGVolume = this.state.batchVolume - volumeTaken;
    PGVolume = Math.round(PGVolume * 100) / 100;
    return PGVolume;
  }

  calculatePGWeight() {
    var PGVolume = this.calculatePGVolume();
    var PGWeight = PGVolume * this.state.ingredients.pg;
    PGWeight = Math.round(PGWeight * 100) / 100;
    return PGWeight;
  }



  render() {
    var flavourInputList = [];
    for (var i = 0; i < this.state.flavours.length; i++) {
      var flavourObject = this.state.flavours[i];
      var flavourComponent = <InputField
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

    var flavourOutputList = [];
    for (var i = 0; i < this.state.flavours.length; i++) {
      var flavourObject = this.state.flavours[i];
      var volume = this.calculateVolume(flavourObject.percentage)
      var outputComponent = <TableRow
        key={flavourObject.key}
        ingredient={flavourObject.label}
        volume={volume}
        weight={this.calculateFlavourWeight(volume)}/>
      flavourOutputList.push(outputComponent);
    }

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="topSection">
          	<div className="leftSection">
              <Card cardHeader="Batch Info">
          			<InputField
                  label="Volume"
                  name="batchVolume"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="ml"
                  placeholder={this.state.batchVolume}/>
          			<InputField
                  label="Nicotine"
                  name="batchNic"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="mg"
                  placeholder={this.state.batchNic}/>
          			<InputField
                  label="VG Ratio"
                  name="batchRatio"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="%VG"
                  placeholder={this.state.batchRatio}/>
          		</Card>
            </div>
            <div className="rightSection">
              <Card cardHeader="Nicotine Base">
                <InputField
                  label="Nicotine"
                  name="baseNic"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="mg"
                  placeholder={this.state.baseNic}/>
                <InputField
                  label="VG Ratio"
                  name="baseRatio"
                  onChange={this.handleInputChange.bind(this)}
                  symbol="%VG"
                  placeholder={this.state.baseRatio}/>
              </Card>
            </div>
          </div>
          <div className="bottomSection">
          	<div className="leftSection">
              <Card cardHeader="Flavours">
                {flavourInputList}
                <Button onClick={this.addFlavour.bind(this)} action="add">+ Add Flavour</Button>
              </Card>
            </div>
            <div className="rightSection">
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
          	</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
