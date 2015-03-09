var HoursCounter = React.createClass({
  increment: function() {
    this.props.onClick(this.props.hours + 1);
  },
  decrement: function() {
    this.props.onClick(this.props.hours - 1);
  },
  render: function() {
    return <span><h1 onClick={this.increment}>+</h1>{this.props.hours}<h1 onClick={this.decrement}>-</h1></span>;
  }
});
