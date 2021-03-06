import reducer from 'stores/form-reducer';
import { SHOW_FORM_MODAL, HIDE_FORM_MODAL } from 'actions/action-types';

describe('reducer', () => {
  it('has a default state', () => {
    const state = reducer();
    expect(state.get('show')).toEqual(false);
    expect(state.get('modelType')).toEqual(null);
    expect(state.get('model').toJS()).toEqual({});
    expect(state.get('allowDelete')).toEqual(false);
    expect(state.get('source')).toEqual(null);
  });

  describe('SHOW_FORM_MODAL', () => {
    it('sets modal show prop to true', () => {
      const state = reducer(undefined, {
        type: SHOW_FORM_MODAL, modelType: 'Transactions', model: { id: 17 }, allowDelete: true, source: 'mySource',
      });
      expect(state.get('show')).toEqual(true);
      expect(state.get('modelType')).toEqual('Transactions');
      expect(state.get('model').toJS()).toEqual({ id: 17 });
      expect(state.get('allowDelete')).toEqual(true);
      expect(state.get('source')).toEqual('mySource');
    });
  });

  describe('HIDE_FORM_MODAL', () => {
    it('sets modal show prop to true', () => {
      const state = reducer(undefined, { type: HIDE_FORM_MODAL });
      expect(state.get('show')).toEqual(false);
      expect(state.get('modelType')).toEqual(null);
      expect(state.get('model').toJS()).toEqual({});
    });
  });
});
