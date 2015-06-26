require 'rails_helper'
require 'lib/date_range'

RSpec.describe DateRangeOption, type: :model do
  before :each do
    @date_range_option = DateRangeOption::CurrentMonthDateRange.new
  end

  it 'has an id' do
    expect(@date_range_option.id).to eq(1)
  end

  it 'has an order' do
    expect(@date_range_option.order).to eq(1)
  end

  it 'has a klass' do
    expect(@date_range_option.klass).to eq('Lib::CurrentMonthDateRange')
  end

  it 'has a date range object' do
    expect(@date_range_option.date_range).to be_a(Lib::CurrentMonthDateRange)
  end

  it 'has a name' do
    expect(@date_range_option.name).to eq('Current Month')
  end
end
