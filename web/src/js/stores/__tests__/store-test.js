import { Map, List, toJS } from 'immutable';
import store from '../store.js';

describe('store', () => {
  it('is a Redux store with reducers', () => {
    expect(store.getState().accountStore.get('accounts')).toEqual(List());

    let account1 = {id: 11, name: 'account1', accountType: 'share'};
    let account2 = {id: 12, name: 'account2', accountType: 'savings'};

    store.dispatch({
      type: 'SET_ACCOUNTS',
      accounts: [account1, account2]
    });

    expect(store.getState().accountStore.get('accounts').toJS()).toEqual([account1, account2]);
  });

  it('has all the reducers', () => {
    let state = store.getState();
    expect(state.accountStore).toBeDefined();
    expect(state.categoryStore).toBeDefined();
    expect(state.transactionStore).toBeDefined();
    expect(state.importStore).toBeDefined();
    expect(state.dateRangeStore).toBeDefined();
  });
});
