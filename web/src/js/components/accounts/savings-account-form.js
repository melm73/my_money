import React, { PropTypes } from 'react';
import moment from 'moment';
import DatePicker from 'react-bootstrap-datetimepicker';
import FormControl from '../common/controls/form-control';
import FormValidator from '../../util/form-validator';

export default class SavingsAccountForm extends React.Component {
  constructor(props) {
    super();
    this.state = { account: Object.assign(this.defaultModelProperties, props.account) };
    this.validator = new FormValidator(this.validationSchema);
  }

  defaultModelProperties = {
    accountType: 'savings',
    openingBalance: 0,
    openingBalanceDate: moment().format('YYYY-MM-DD'),
  };

  validationSchema = {
    name: { presence: true },
    openingBalance: { presence: true, numericality: true },
    openingBalanceDate: { presence: true, datetime: { dateOnly: true } },
  };

  handleDateChange = (date) => {
    let changedDate = date;
    if (date === 'Invalid date') {
      changedDate = '';
    }
    this.handleChange({ target: { name: 'openingBalanceDate', value: changedDate } });
  };

  handleChange = (event) => {
    const account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({ account });

    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    return !this.validator.validateAll(this.state.account);
  }

  getModel() {
    return this.state.account;
  }

  render() {
    return (
      <div>
        <FormControl name="name" validator={this.validator} label="Name">
          <input
            className="form-control"
            name="name"
            type="text"
            value={this.state.account.name || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="bank" validator={this.validator} label="Bank">
          <input
            className="form-control"
            name="bank"
            type="text"
            value={this.state.account.bank || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="openingBalance" validator={this.validator} label="Opening Balance">
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input
              className="form-control"
              name="openingBalance"
              type="text"
              value={this.state.account.openingBalance}
              onChange={this.handleChange}
            />
          </div>
        </FormControl>
        <FormControl name="openingBalanceDate" validator={this.validator} label="Opening Balance Date">
          <DatePicker
            name="openingBalanceDate"
            dateTime={this.state.account.openingBalanceDate}
            format="YYYY-MM-DD"
            inputFormat="DD-MMM-YYYY"
            showToday
            mode="date"
            onChange={this.handleDateChange}
          />
        </FormControl>
      </div>
    );
  }
}

SavingsAccountForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bank: PropTypes.string,
    openingBalance: PropTypes.number,
    openingBalanceDate: PropTypes.string,
  }).isRequired,
};
