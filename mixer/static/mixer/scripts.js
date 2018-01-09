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
        this.addFlavour = this.addFlavour.bind(this);
        const flavours = {};
        for (var i = 0; i < this.props.ingredients; i++) {
            flavours[i] = 0;
        }
        this.state = {
            flavours: flavours
        }
    }

    handleFlavourChange(e) {
        // make local copy of state
        const flavours = Object.assign({}, this.state.flavours);
        console.log(flavours);
    }

    addFlavour(key) {
        // make local copy of state
        const localFlavours = Object.assign({}, this.state.flavours);

        // if new flavour already in the state, do nothing
        if (localFlavours[key]) return;

        // add it to the state,
        localFlavours[key] = 0;
        this.setState({flavours: localFlavours});
    }

    render() {
        // adding IngredientInputs to list
        const ingredientList = [];
        for (var i = 0; i < this.props.ingredients; i++) {
            // this.addFlavour(i);
            ingredientList[i] =
                <IngredientInput
                    flavourNumber={i}
                    key={i.toString()}
                    onChangeFunction={this.handleFlavourChange}/>;
        }

        //rendering list of IngredientInputs
        return (
            <div>
                {ingredientList}
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
              <legend>Flavour {this.props.flavourNumber}</legend>
              <input onChange={this.props.onChangeFunction}/>
          </fieldset>
        );
    }
}

class OutPut extends React.Component {

}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

console.log("Fuck");