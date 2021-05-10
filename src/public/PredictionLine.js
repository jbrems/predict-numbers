'use strict';

class PredictionLine extends React.Component {
  constructor(props) {
    super(props);

    this.setAnswer = this.setAnswer.bind(this);
  }

  setAnswer (event) {
    const attribute = event.target.attributes.getNamedItem('data-number') || event.target.parentElement.attributes.getNamedItem('data-number') || event.target.parentElement.parentElement.attributes.getNamedItem('data-number');
    this.props.setAnswer(attribute.value);
  }

  render () {
    let buttonClass = 'px-2 mr-4 border rounded';
    if (this.props.correct) buttonClass += ' bg-green-300';
    else buttonClass += ' bg-red-300';

    return <section className="flex">
      <button className={buttonClass} onClick={this.setAnswer} data-number={this.props.number}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></button>
      {this.props.number}:
      <div style={{ height: '25px', backgroundColor: 'green', width: this.props.certainty * 2 + 'px', margin: '3px 5px'}}></div>
      {this.props.certainty}%
    </section>
  }
}
