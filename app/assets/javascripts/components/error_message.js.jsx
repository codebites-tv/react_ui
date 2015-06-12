var ErrorMessage = React.createClass({
  render: function() {
    if (this.props.message) {
      return (
        <div><span>{this.props.message}</span></div>
      );
    } else {
      return (<span></span>);
    }

  }
})
