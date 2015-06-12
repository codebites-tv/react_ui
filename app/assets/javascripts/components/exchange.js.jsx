var Exchange = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ errorMessage: null });
    $.ajax({
      url: '/api/v1/converter/exchange',
      dataType: 'json',
      data: {
        amount: React.findDOMNode(this.refs.amount).value.trim(),
        to_currency: React.findDOMNode(this.refs.to_currency).value.trim()
      },
      cache: false,
      success: function(data) {
        this.setState({
          amount: data.amount,
          to_currency: data.currency
        });
      }.bind(this),
      error: function(xhr, status, err) {
        var errorResponse = $.parseJSON(xhr.responseText);
        this.setState({
                        errorMessage: errorResponse.message,
                        amount: '',
                        to_currency: '',
                      });
      }.bind(this)
    })
  },
  getInitialState: function() {
    return { amount: '', to_currency: '' };
  },
  render: function() {
    var currencyOptions = this.props.currencies.map(function(currency) {
      return(
        <option>{currency}</option>
      );
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <ErrorMessage message={this.state.errorMessage} />
        <label for='amount'>Amount in USD</label>
        <input type='text' name='amount' placeholder='Amount' ref='amount'></input>
        <br />
        <label for='to_currency'>Select Currency</label>
        <select name='to_currency' ref='to_currency'>
          {currencyOptions}
        </select>
        <br />
        <br />

        <input type='submit' value='Exchange Currency' />
        <br />
        <ConversionResult amount={this.state.amount} currency={this.state.to_currency} />
      </form>
    );
  }
});
