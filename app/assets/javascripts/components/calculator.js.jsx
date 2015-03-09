var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var Calculator = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {employees: [100000], consultants: [], hours: 1, seconds: 0}
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  addConsultant: function(event) {
    consultants = this.state.consultants;
    consultants.push(200);
    this.setState({consultants: consultants});
  },
  addEmployee: function(event) {
    employees = this.state.employees;
    employees.push(100000);
    this.setState({employees: employees});
  },
  changeHours: function(hours) {
    this.setState({hours: hours});
  },
  render: function() {
    var employees_html = this.state.employees.map(function(salary) { return <Employee salary={salary}/>; });
    var consultants_html = this.state.consultants.map(function(hourly) { return <Consultant hourly={hourly}/>; });

    return <div>
      <h2>Employees</h2>
      {employees_html}
      <a onClick={this.addEmployee}>add</a>
      <h2>Consultants</h2>
      {consultants_html}
      <a onClick={this.addConsultant}>add</a>
      <HoursCounter onClick={this.changeHours} hours={this.state.hours}/>
      <MeetingTotal employees={this.state.employees} consultants={this.state.consultants} hours={this.state.hours} seconds={this.state.seconds}/>
    </div>;
  }
});
