require 'rails_helper'

describe 'CsvParser' do
  it 'returns the transactions from the CSV file' do
    file = Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/test.csv'))

    parser = Lib::CsvParser.new file
    transactions = parser.transactions

    expect(transactions.length).to eq(2)

    expect(transactions[0].memo).to eq('Some Income')
    expect(transactions[0].date).to eq(Date.parse('2016-04-11'))
    expect(transactions[0].amount).to eq(1001)

    expect(transactions[1].memo).to eq('An Expense')
    expect(transactions[1].date).to eq(Date.parse('2016-04-11'))
    expect(transactions[1].amount).to eq(-2341)
  end
end
