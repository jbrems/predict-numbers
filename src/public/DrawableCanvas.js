'use strict';

class DrawableCanvas extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDrawing: false,
      lastMousePosition: [0, 0],
    }

    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.draw = this.draw.bind(this);
    this.reset = this.reset.bind(this);
    this.updateThumbnail = this.updateThumbnail.bind(this);
  }

  componentDidMount () {
    const canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
    canvas.height = 280;
    canvas.width = 280;
  }

  getRelativeMousePosition (mouseEvent) {
    const relativeX = mouseEvent.clientX - mouseEvent.target.offsetParent.offsetLeft;
    const relativeY = mouseEvent.clientY - mouseEvent.target.offsetParent.offsetTop;
    return [relativeX, relativeY];
  }

  startDrawing (event) {
    this.setState(() => ({ isDrawing: true, lastMousePosition: this.getRelativeMousePosition(event) }));
  }

  stopDrawing (event) {
    if (!this.state.isDrawing) return;

    this.setState(() => ({ isDrawing: false }));
    this.updateThumbnail();
  }

  draw (event) {
    if (!this.state.isDrawing) return;

    this.ctx.beginPath();

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#ffffff';


    const [lastX, lastY] = this.state.lastMousePosition;
    this.ctx.moveTo(lastX, lastY);
    const [currentX, currentY] = this.getRelativeMousePosition(event);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.setState(() => ({ lastMousePosition: [currentX, currentY] }));
  }

  reset () {
    this.ctx.clearRect(0, 0, 280, 280);
  }

  updateThumbnail () {
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        const segment = this.ctx.getImageData(i * 10, j * 10, 10, 10);
        const pixels = segment.data;
        // 4 values for every pixel: r, g, b and alpha
        const redValues = pixels.filter((pixel, index) => index % 4 === 0);
        const summedRedValues = redValues.reduce((sum, value) =>  sum + value, 0);
        const avgRedValue = Math.ceil(summedRedValues / 100);

        const thumbnailPixel = new ImageData(Uint8ClampedArray.from([avgRedValue, avgRedValue, avgRedValue, 255]), 1, 1);

        this.ctx.putImageData(thumbnailPixel, i, j);
      }
    }

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.moveTo(0, 28);
    this.ctx.lineTo(28, 28);
    this.ctx.lineTo(28, 0);
    this.ctx.stroke();
  }

  render () {
    return <section className="relative"  style={{ width: '280px' }}>
      <canvas className="bg-black cursor-pointer"
        onMouseDown={this.startDrawing}
        onMouseUp={this.stopDrawing}
        onMouseLeave={this.stopDrawing}
        onMouseMove={this.draw}
      />
      <button className="absolute top-1 right-1 text-white" onClick={this.reset}>
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
      </button>
    </section>;
  }
}
