import store from '../stores/store';
import apiUtil from '../util/api-util';
import { GET_REPORT } from './report-actions';
import { getAccounts } from './account-actions';

export const SET_LOAN_REPORT = 'SET_LOAN_REPORT';
export function getLoanReport() {
  Promise.all([
    getAccounts({ useStore: true }),
  ]).then(() => fetchLoanReport());
}

export function fetchLoanReport() {
  store.dispatch({ type: GET_REPORT });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.get({
    url: `report/home_loan?account_id=${accountId}`,
    onSuccess: response => storeLoanReport(response),
  });
}

function storeLoanReport(response) {
  store.dispatch({ type: SET_LOAN_REPORT, report: response });
}
