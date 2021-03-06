import React from 'react';
import { shallow } from 'enzyme';
import LoanChartView from '../loan-chart-view';
import D3LineChart from '../../reports/d3-line-chart';
import * as loanActions from '../../../actions/loan-actions';

describe('LoanReport', () => {
  beforeEach(() => {
    spyOn(loanActions, 'getLoanReport');
  });

  it('calls the report action', () => {
    shallow(<LoanChartView seriesData={[{ name: 'Series1' }]} />);
    expect(loanActions.getLoanReport).toHaveBeenCalled();
  });

  describe('render', () => {
    it('has a chart if seriesData is set and view is chart', () => {
      const view = shallow(<LoanChartView seriesData={[{ name: 'Series1' }]} />);

      const chart = view.find(D3LineChart);
      expect(chart.prop('chartData')).toEqual({ seriesData: [{ name: 'Series1' }] });
    });

    it('has no chart if seriesData is null', () => {
      const view = shallow(
        <LoanChartView
          apiStatus={{ status: 'DONE' }}
          seriesData={[]}
          view="chart"
        />
      );
      expect(view.find(D3LineChart).length).toEqual(0);
    });
  });
});
