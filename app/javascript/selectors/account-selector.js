import { createSelector } from 'reselect';

const accountSelector = state => state.accountStore.get('accounts');
const accountTypeSelector = state => state.accountStore.get('accountTypes');

function groupedAccounts(accountTypes, accounts) {
  return accounts.groupBy(account => account.get('accountType'));
}

export default createSelector(
  accountTypeSelector,
  accountSelector,
  (accountTypes, accounts) => groupedAccounts(accountTypes, accounts)
);
