import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentAccount, setSelectedAccounts } from '../../../actions/account-actions';
import accountSelector from '../../../selectors/account-selector';
import AccountPicker from '../controls/AccountPicker';

export class AccountFilterComponent extends React.Component {
  onChange = (value) => {
    if (this.props.multiple) {
      setSelectedAccounts(value);
    } else {
      setCurrentAccount(value);
    }
    this.props.fetch();
  };

  renderAccountPicker() {
    if (this.props.loaded) {
      const value = this.props.multiple ? this.props.selectedAccounts : this.props.currentAccount.id;
      return (
        <AccountPicker
          multiple={this.props.multiple}
          accountTypes={this.props.accountTypes}
          accountGroups={this.props.accountGroups}
          value={value}
          onChange={this.onChange}
        />
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="account-filter">
        {this.renderAccountPicker()}
      </div>
    );
  }
}

AccountFilterComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  accountGroups: PropTypes.shape({}).isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.number,
  }),
  selectedAccounts: PropTypes.arrayOf(PropTypes.number),
  fetch: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    accountGroups: accountSelector(state).toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
    selectedAccounts: state.accountStore.get('selectedAccounts').toJS(),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
  };
}

export default connect(mapStateToProps)(AccountFilterComponent);
