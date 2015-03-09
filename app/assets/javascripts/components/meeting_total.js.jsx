var MeetingTotal = React.createClass({
  getInitialState: function() {
    return {context_switch_total: 0, running_total: 0, hard_cost: 0};
  },
  calculateTotal: function(consultants, employees) {
    hourlies = this.calcHourlies(consultants, employees);
    return hourlies.reduce(function(total, hourly) {return total + hourly;}, 0);
  },
  calculateContextSwitch: function(consultants, employees) {
    hourlies = this.calcHourlies(consultants, employees);
    console.log(hourlies);
    return hourlies.reduce(function(total, hourly) {return total + hourly;}) * 0.5;
  },
  calcHourlies: function(consultants, employees) {
    hourlies = employees.map(function(salary) { return salary / 2000; });
    hourlies = hourlies.concat(consultants);
    return hourlies;
  },
  componentWillReceiveProps: function(nextProps) {
    hard_cost = this.calculateTotal(nextProps.consultants, nextProps.employees);
    running_total = (hard_cost / 3600) * nextProps.seconds
    this.setState({
      context_switch_cost: this.calculateContextSwitch(nextProps.consultants, nextProps.employees),
      running_total: (Math.round(running_total * 100) / 100).toFixed(2),
      hard_cost: hard_cost * nextProps.hours
    });
  },
  componentDidMount: function(){
    this.componentWillReceiveProps(this.props);
  },
  render: function() {
    return <span>
    <h1>Hard Cost: {this.state.hard_cost}</h1>
    <h1>Soft Cost: {this.state.hard_cost}</h1>
    <h1>Context Switch Cost: {this.state.context_switch_cost}</h1>
    <h1>Total Cost: {this.state.context_switch_cost + (this.state.hard_cost * 2)}</h1>
    <h1>Running Total: {this.state.running_total} </h1>
    </span>;
  }
});
