class App extends React.Component {
    render() {
        return (
            // eventually make ingredients change dynamically based on user input - add/remove
            <div>
                <Recipe ingredients={3} volume={30} />
            </div>
        )
    }
}

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleFlavourChange = this.handleFlavourChange.bind(this);
        const flavours = {};
        for (var i = 0; i < this.props.ingredients; i++) {
            flavours[i] = 0;
        }
        this.state = {
            flavours: flavours
        }
    }

    handleFlavourChange(key, event) {
        // make local copy of state
        const flavours = Object.assign({}, this.state.flavours);
        flavours[key] = event.target.value;
        this.setState({flavours: flavours});
        console.log(this.state.flavours);
    }

    render() {
        // adding IngredientInputs to list
        const ingredientInputs = [];
        const ingredientOutputs = [];
        for (var i = 0; i < this.props.ingredients; i++) {
            ingredientInputs[i] =
                <IngredientInput
                    flavourNumber={i}
                    key={i.toString()}
                    onChangeFunction={this.handleFlavourChange}/>;

            ingredientOutputs[i] =
                <IngredientOutput
                    flavourNumber={i}
                    key={i.toString()}
                    volume = {this.props.volume}
                    percentage = {this.state.flavours[i]} />
        }

        //rendering list of IngredientInputs
        return (
            <div>
                {ingredientInputs}
                <br/>
                {ingredientOutputs}
            </div>
        );
    }
}

class IngredientInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: "",
        }
    }

    render() {
        return (
          <fieldset>
              <legend>Flavour {this.props.flavourNumber} Input</legend>
              <input onChange={this.props.onChangeFunction.bind(this, this.props.flavourNumber)}/> %
          </fieldset>
        );
    }
}

class IngredientOutput extends React.Component {
    render() {
        const outputVolume = (this.props.volume * this.props.percentage) / 100;
        return(
            <fieldset>
              <legend>Flavour {this.props.flavourNumber} Output</legend>
              <div>{outputVolume} g</div>
          </fieldset>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);