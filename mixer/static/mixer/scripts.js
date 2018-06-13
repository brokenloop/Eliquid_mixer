class App extends React.Component {
    render() {
        return (
            // eventually make ingredients change dynamically based on user input - add/remove
            <Recipe ingredients={3}/>
        )
    }
}

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleFlavourChange = this.handleFlavourChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);

        const flavours = {};
        for (var i = 0; i < this.props.ingredients; i++) {
            flavours[i] = 0;
        }
        this.state = {
            flavours: flavours,
            volume: 30
        }
    }

    handleFlavourChange(key, event) {
        // make local copy of state
        const flavours = Object.assign({}, this.state.flavours);
        flavours[key] = event.target.value;
        this.setState({flavours: flavours});
        console.log(this.state.flavours);
    }

    handleVolumeChange(event) {
        this.setState({volume: event.target.value});
    }

    render() {
        // adding IngredientInputs to list
        const ingredientInputs = [];
        const ingredientOutputs = [];
        for (var i = 0; i < this.props.ingredients; i++) {
            ingredientInputs[i] =
                <IngredientInput
                    inputId={"input" + i}
                    label={"Flavour " + i}
                    flavourNumber={i}
                    key={i.toString()}
                    placeholder={this.state.flavours[i]}
                    addon="%"
                    onChangeFunction={this.handleFlavourChange}/>;

            ingredientOutputs[i] =
                <IngredientOutput
                    flavourNumber={i}
                    key={i.toString()}
                    volume = {this.state.volume}
                    percentage = {this.state.flavours[i]} />
        }

        const batchInput = [<InputComponent
                                inputId={"volume"}
                                label="volume"
                                key="volume"
                                placeholder={this.state.volume}
                                addon="ml"
                                onChangeFunction={this.handleVolumeChange}/>]


        //rendering list of IngredientInputs
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 inputGroup">
                        {/*<InputSection/>*/}
                        <div id="accordion" role="tablist">
                            <AccordionMember
                                collapseId="collapse1"
                                cardName="Batch Info"
                                content={batchInput}/>
                            <AccordionMember
                                collapseId="collapse2"
                                cardName="Nic Info"
                                content="This is some more content"/>
                            <AccordionMember
                                collapseId="collapse3"
                                cardName="Flavour Info"
                                content={ingredientInputs}/>
                        </div>
                    </div>
                    <div className="col-sm outputGroup">
                        <OutputCard
                            cardLabel="Recipe Amounts"
                            content={ingredientOutputs}/>
                    </div>
                </div>
            </div>
        );
    }
}

{/*<div className="container">*/}
    {/*<div className="basics item">*/}
        {/*<BasicSection volume={this.state.volume} onChangeFunction={this.handleVolumeChange}/>*/}
    {/*</div>*/}
    {/*<div className="ingredients item">*/}
        {/*{ingredientInputs}*/}
    {/*</div>*/}
    {/*/!*<br/>*!/*/}
    {/*<div className="output item">*/}
        {/*{ingredientOutputs}*/}
    {/*</div>*/}
{/*</div>*/}

class IngredientInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group row">
                <label htmlFor={this.props.inputId} className="col-sm-5 col-form-label">{this.props.label}</label>
                <div className="col-sm input-group">
                  <input
                      type="number"
                      className="form-control"
                      id={this.props.inputId}
                      placeholder={this.props.placeholder}
                      onChange={this.props.onChangeFunction.bind(this, this.props.flavourNumber)}/>
                      <div className="input-group-append">
                        <span className="input-group-text">{this.props.addon}</span>
                      </div>
                </div>
              </div>
        );
    }
}

class InputComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="form-group row">
                <label htmlFor={this.props.inputId} className="col-sm-5 col-form-label">{this.props.label}</label>
                <div className="col-sm input-group">
                  <input
                      type="number"
                      className="form-control"
                      id={this.props.inputId}
                      placeholder={this.props.placeholder}
                      onChange={this.props.onChangeFunction}/>
                      <div className="input-group-append">
                        <span className="input-group-text">{this.props.addon}</span>
                      </div>
                </div>
              </div>
        )
    }
}


class IngredientOutput extends React.Component {
    render() {
        const outputVolume = (this.props.volume * this.props.percentage) / 100;
        return(
            <fieldset>
              <legend>Flavour {this.props.flavourNumber}</legend>
              {outputVolume} ml
          </fieldset>
        )
    }
}

class BasicSection extends React.Component {
    render() {
        return(
            <div className="panel panel-default">
              <div className="panel-heading">Batch Details</div>
              <div className="panel-body">
                  <input
                    className="inputBox"
                    placeholder={this.props.volume}
                    onChange={this.props.onChangeFunction}/>
              </div>
            </div>
        )
    }
}

class OutputCard extends React.Component {
    render() {
        return(
            <div className="card">
                <div className="card-header" role="tab">
                  <h6 className="mb-0">
                      {this.props.cardLabel}
                  </h6>
                </div>
                  <div className="card-body">
                      {this.props.content}
                  </div>
              </div>
        )
    }
}


class AccordionMember extends React.Component {
    constructor(props) {
    super(props)
  }
    render() {
        return(
            <div className="card">
                <div className="card-header" role="tab">
                  <h6 className="mb-0">
                    <a data-toggle="collapse" href={"#" + this.props.collapseId} role="button" aria-expanded="true" aria-controls={this.props.collapseId}>
                        {this.props.cardName}
                    </a>
                  </h6>
                </div>

                <div id={this.props.collapseId} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                  <div className="card-body">
                      {this.props.content}
                  </div>
                </div>
              </div>
        )
    }
}

class Accordion extends React.Component {
    render() {
        return(
            <div id="accordion" role="tablist">
                <AccordionMember
                    collapseId="collapse1"
                    cardName="Batch Info"
                    content="This is some content"/>
                <AccordionMember
                    collapseId="collapse2"
                    cardName="Nic Info"
                    content="This is some more content"/>
                <AccordionMember
                    collapseId="collapse3"
                    cardName="Flavour Info"
                    content="This is even more content"/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);