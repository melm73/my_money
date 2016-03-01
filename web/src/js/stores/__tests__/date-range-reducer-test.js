import { List, Map, toJS } from 'immutable';
import dateRangeReducer from '../date-range-reducer';
import { toEqualImmutable } from 'jasmine-immutablejs-matchers';

describe('DateRangeReducer', () => {
  let dateRanges;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', default: false, custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', default: true, custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
  });

  it('has a default state', () => {
    const state = dateRangeReducer();

    expect(state.get('loaded')).toEqual(false);
    expect(state.get('dateRanges').toJS()).toEqual([]);
    expect(state.get('currentDateRange').toJS()).toEqual({});
  });

  describe('SET_DATE_RANGES', () => {
    let nextState;
    beforeEach(() => {
      const initialState = dateRangeReducer();
      let action = { type: 'SET_DATE_RANGES', dateRanges: dateRanges }
      nextState = dateRangeReducer(initialState, action);
    });

    it('saves the given date ranges into the store', () =>{
      expect(nextState.get('dateRanges').toJS()).toEqual(dateRanges);
      expect(nextState.get('loaded')).toEqual(true);
    });

    it('sets the current date range to the default date range', () => {
      expect(nextState.get('currentDateRange').toJS()).toEqual(dateRanges[1]);
    });
  });

  describe('SET_CURRENT_DATE_RANGE', () => {
    it('sets currentDateRange with id', () => {
      const initialState = dateRangeReducer();
      let action1 = { type: 'SET_DATE_RANGES', dateRanges: dateRanges }
      let action2 = { type: 'SET_CURRENT_DATE_RANGE', id: 11 }
      const midState = dateRangeReducer(initialState, action1);
      let nextState = dateRangeReducer(midState, action2);

      expect(nextState.get('currentDateRange').toJS()).toEqual(dateRanges[0]);
    });
  });

  describe('UPDATE_CURRENT_DATE_RANGE', () => {
    it('updates the currently selected date ranges from date', () => {
      const initialState = dateRangeReducer();
      let action1 = { type: 'SET_DATE_RANGES', dateRanges: dateRanges }
      let action2 = { type: 'UPDATE_CURRENT_DATE_RANGE', dateChange: {fromDate: '2015-01-12'} }
      const midState = dateRangeReducer(initialState, action1);
      let nextState = dateRangeReducer(midState, action2);

      let currentDateRange = nextState.get('currentDateRange');
      expect(currentDateRange.get('toDate')).toEqual('2014-09-03');
      expect(currentDateRange.get('fromDate')).toEqual('2015-01-12');
    });

    it('updates the currently selected date ranges to date', () => {
      const initialState = dateRangeReducer();
      let action1 = { type: 'SET_DATE_RANGES', dateRanges: dateRanges }
      let action2 = { type: 'UPDATE_CURRENT_DATE_RANGE', dateChange: {toDate: '2015-01-12'} }
      const midState = dateRangeReducer(initialState, action1);
      let nextState = dateRangeReducer(midState, action2);

      let currentDateRange = nextState.get('currentDateRange');
      expect(currentDateRange.get('toDate')).toEqual('2015-01-12');
      expect(currentDateRange.get('fromDate')).toEqual('2014-06-23');
    });
  });
});
