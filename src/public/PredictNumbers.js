'use strict';

class PredictNumbers extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};

    this.updateImage = this.updateImage.bind(this);
    this.updatePrediction = this.updatePrediction.bind(this);
  }

  updateImage (image) {
    console.log(image);
    this.setState(() => ({ image }));
  }

  updatePrediction (prediction) {
    console.log('Updating prediction from app', prediction);
    this.setState(() => ({ prediction }));
  }

  render () {
    return <section className="grid grid-cols-2">
      <section>
        <h1>Draw a number between 0 and 9</h1>
        <DrawableCanvas onImageUpdate={this.updateImage} />
        <PredictButton image={this.state.image} updatePrediction={this.updatePrediction}/>
      </section>
      <Prediction prediction={this.state.prediction} image={this.state.image} />
    </section>;
  }
}
