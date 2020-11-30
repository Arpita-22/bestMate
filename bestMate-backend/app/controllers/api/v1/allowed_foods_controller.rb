class  Api::V1::AllowedFoodsController < ApplicationController
    before_action :set_allowed_food, only: [:show,:update,:destroy]
    skip_before_action :authorized, only: [:create, :index, :destroy, :update]

    def index
    @allowed_foods = AllowedFood.all
    render json: @allowed_foods, status: 200
    end

    def create
    @allowed_food = AllowedFood.create(allowed_food_params)
    render json: {allowed_food: AllowedFoodSerializer.new(@allowed_food)}
    end

    def update
    @allowed_food = AllowedFood.find_or_create_by(params[:id])
    @allowed_food.update(allowed_food_params)
    render json: @allowed_food, status: 200, include:[:user]
    end

    def destroy
    @allowed_food = allowed_food(params[:id])
    @allowed_food.destroy
    render json: {message:"Zap! Note deleted"}
    end

    def show
    render json: @allowed_food, status: 200
    end

    private
    def allowed_food_params
      params.require(:allowed_food).permit(:id, :name, :user_id)
    end
  
    def set_allowed_food
      @allowed_food = AllowedFood.find(params[:user_id])
    end
end
