require 'rails_helper'
require 'lib/date_range'

RSpec.describe Lib::SubcategorySearch, type: :class do
  before :each do
    @share_account = FactoryBot.create(:account, account_type: AccountType::Share.new)
    @loan_account = FactoryBot.create(:account, account_type: AccountType::Loan.new)
    @sc = FactoryBot.create(:subcategory)

    @c = @sc.category
    @t1 = FactoryBot.create(:transaction, date: '2014-01-01', category: @c, amount: 4, subcategory: @sc)
    @t2 = FactoryBot.create(:transaction, date: '2014-01-02', category: @c, subcategory: nil, amount: 10)
    @t3 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: 12)
    @t4 = FactoryBot.create(:transaction, date: '2014-02-02', category: @c, subcategory: nil, amount: 15)
    @t5 = FactoryBot.create(:transaction, account: @loan_account, date: '2014-01-03', category: @c, subcategory: @sc, amount: 5)
    @t6 = FactoryBot.create(:transaction, date: '2014-03-02', category: @c, subcategory: nil)
    @t7 = FactoryBot.create(:transaction, date: '2014-03-03', category: @c, subcategory: @sc)
    @t8 = FactoryBot.create(:transaction, account: @share_account, date: '2014-01-13', category: @c, subcategory: @sc)

    @dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28')
  end

  it 'sets default values if no arguments given' do
    search = Lib::SubcategorySearch.new({ })
    expect(search.category).to be_nil
    expect(search.subcategory).to be_nil
  end

  it 'returns transactions for the given category' do
    search = Lib::SubcategorySearch.new(date_range: @dr, category: @c, subcategory: @sc)
    expect(search.transactions).to eq([@t5, @t1])
  end

  it 'returns transactions with no subcategory if subcategory not specified' do
    search = Lib::SubcategorySearch.new(date_range: @dr, category: @c)
    expect(search.transactions).to eq([@t4, @t2])
  end

  it 'returns the sum of all transactions' do
    search = Lib::SubcategorySearch.new(date_range: @dr, category: @c, subcategory: @sc)
    expect(search.sum).to eq(9) # 5+4
  end

  it 'returns a summary of all transactions by month' do
    search = Lib::SubcategorySearch.new(date_range: @dr, category: @c, subcategory: @sc)
    expect(search.month_totals).to eq([['Jan-14', 9], ['Feb-14', 0]])
  end
end
