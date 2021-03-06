# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170228082523) do

  create_table "account_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "accounts", force: true do |t|
    t.string   "name"
    t.string   "bank"
    t.integer  "starting_balance"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "starting_date"
    t.integer  "reconciliation_id"
    t.string   "ticker"
    t.string   "account_type"
    t.integer  "limit"
    t.integer  "term"
    t.decimal  "interest_rate"
  end

  create_table "bank_statements", force: true do |t|
    t.integer  "account_id"
    t.date     "date"
    t.integer  "transaction_count"
    t.string   "file_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "budgets", force: true do |t|
    t.integer  "account_id"
    t.string   "description"
    t.integer  "day_of_month"
    t.integer  "amount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_type_id"
  end

  create_table "category_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "data_files", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "patterns", force: true do |t|
    t.integer  "account_id"
    t.string   "match_text"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
    t.integer  "subcategory_id"
    t.string   "notes"
  end

  create_table "reconciliations", force: true do |t|
    t.integer  "account_id"
    t.date     "statement_date"
    t.integer  "statement_balance"
    t.boolean  "reconciled"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "last_reconciled_date"
    t.decimal  "last_reconciled_balance"
  end

  create_table "subcategories", force: true do |t|
    t.string   "name"
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transaction_types", force: true do |t|
    t.integer  "account_type_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", force: true do |t|
    t.string   "transaction_type"
    t.date     "date"
    t.integer  "amount"
    t.string   "fitid"
    t.string   "memo"
    t.integer  "account_id"
    t.integer  "category_id"
    t.integer  "subcategory_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "notes"
    t.integer  "reconciliation_id"
    t.integer  "balance"
    t.integer  "unit_price"
    t.integer  "quantity"
    t.integer  "bank_statement_id"
    t.integer  "matching_transaction_id"
  end

end
