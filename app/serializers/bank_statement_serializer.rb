# frozen_string_literal: true

class BankStatementSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :date, :file_name, :transaction_count
end
