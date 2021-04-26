'use strict';

class Prediction extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (!this.props.prediction) return null;

    const confidence = Math.max(...this.props.prediction);
    const result = this.props.prediction.indexOf(confidence);

    console.log(this.props.prediction.map(n => n.toFixed(2) * 100));

    return <section className="grid grid-cols-2">
      <h1 className="text-center" style={{fontSize: '200px'}}>{result}</h1>
      <section>
        {this.props.prediction.map(n => n.toFixed(2) * 100).map((n, i) => (<section className="flex">
          {i}: <div style={{ height: '25px', backgroundColor: 'green', width: n * 2 + 'px', margin: '3px 5px'}}></div> {n}%
        </section>))}
      </section>
    </section>;
  }
}
