# frozen_string_literal: true

class AccountType < ClassyEnum::Base
  def code
    option.to_s
  end

  def name
    option.to_s.capitalize
  end

  class Savings < AccountType
    def id
      1
    end
  end

  class Share < AccountType
    def id
      2
    end
  end

  class Loan < AccountType
    def id
      3
    end
  end
end
