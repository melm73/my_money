class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  # GET /categories
  # GET /categories.json
  def index
    @income_categories = CategoryType.income.categories
    @expense_categories = CategoryType.expense.categories
  end

  # GET /categories/1
  # GET /categories/1.json
  def show
  end

  # GET /categories/new
  def new
    @category = Category.new
    load_form_data
  end

  # GET /categories/1/edit
  def edit
    load_form_data
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to categories_url, notice: "Category \'#{@category.name}\' was successfully created." }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to categories_url, notice: "Category \'#{@category.name}\' was successfully updated." }
        format.json { render :show, status: :ok, location: @category }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url, notice: "Category \'#{@category.name}\' was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  # called when user changes category on transaction forms
  def subcategories_by_category

    if params[:category_id].present?
      @subcategories = Category.find(params[:category_id]).subcategories
    else
      @subcategories = []
    end

    respond_to do |format|
      format.js
    end
  end
  
  
  private
  
    def load_form_data
      @category_types = CategoryType.all
    end
    
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_params
      params.require(:category).permit(:name, :category_type_id)
    end
end
