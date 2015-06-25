require 'rails_helper'

RSpec.describe AccountTypesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all account types' do
      get :index, {}, valid_session
      expect(response).to be_success
      json = JSON.parse(response.body)

      expect(json['account_types'].length).to eq(2)
      expect(json['account_types'][0]).to eq({ 'id' => 1, 'code' => 'savings', 'name' => 'Savings' })
      expect(json['account_types'][1]).to eq({ 'id' => 2, 'code' => 'share', 'name' => 'Share' })
    end
  end
end
