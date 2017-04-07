class Factory
  def self.create_account(attrs)
    default_attrs = {
      name: 'My Account',
      bank: 'My Bank',
      account_type: AccountType::SAVINGS,
      starting_balance: 2,
      starting_date: '2016-12-19',
      ticker: 'MMM',
      limit: 3,
      term: 4,
      interest_rate: 1.11
    }

    Account.create(default_attrs.merge(attrs))
  end
end
