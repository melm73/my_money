class CategoryTypesController < ApplicationController
  def index
    render json: CategoryType.all
  end
end