'use strict';

class PredictButton extends React.Component {
  constructor (props) {
    super(props);

    this.predict = this.predict.bind(this);
  }

  async predict () {
    if (!this.props.image) return alert('No image to predict!');

    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.image),
    });

    const prediction = await response.json();
    console.log('Updating prediction from button', prediction);
    this.props.updatePrediction(prediction);
  }

  render () {
    return <button onClick={this.predict} className="my-4 p-4 border rounded bg-green-300">Predict number</button>;
  }
}
