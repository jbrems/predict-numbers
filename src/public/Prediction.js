'use strict';

class Prediction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};

    this.setAnswer = this.setAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  setAnswer (answer) {
    console.log(answer);
    this.setState(() => ({ answer }));
  }

  async saveAnswer () {
    console.log('Saving answer ' + this.state.answer);

    const response = await fetch('/predict/answer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ label: this.state.answer, image: this.props.image }),
    });
  }

  render () {
    if (!this.props.prediction) return null;

    const confidence = Math.max(...this.props.prediction);
    const result = this.props.prediction.indexOf(confidence);

    console.log(result, this.state.answer);

    let resultClass = 'text-yellow-500';
    if (this.state.answer !== undefined) resultClass = 'text-red-500';
    if (this.state.answer === result.toString()) resultClass = 'text-green-500';

    const saveButton = this.state.answer !== undefined ? <button onClick={this.saveAnswer} className="p-4 border rounded bg-blue-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"/></svg></button> : null;


    return <section className="grid grid-cols-2">
      <h1 className={resultClass} style={{fontSize: '200px'}}>{result} { saveButton }</h1>
      <section>
        {this.props.prediction.map(n => n.toFixed(2) * 100).map((n, i) => <PredictionLine number={i} certainty={n} key={i} correct={i === result} setAnswer={this.setAnswer}/>)}
      </section>
    </section>;
  }
}
