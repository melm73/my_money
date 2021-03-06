# frozen_string_literal: true

class ImportedTransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :date, :amount, :memo, :notes, :category_id,
             :subcategory_id, :balance, :reconciliation_id, :duplicate, :import
end
