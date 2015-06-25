class AccountType < ClassyEnum::Base
  include ActiveModel::Serialization

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
end
