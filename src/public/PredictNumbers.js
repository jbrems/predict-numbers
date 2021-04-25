'use strict';

class PredictNumbers extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};

    this.updateImage = this.updateImage.bind(this);
  }

  updateImage (image) {
    console.log(image);
    this.setState(() => ({ image }));
  }

  render () {
    return <section>
      <h1>Draw a number between 0 and 9</h1>
      <DrawableCanvas onImageUpdate={this.updateImage} />
      <PredictButton image={this.state.image}/>
    </section>;
  }
}
