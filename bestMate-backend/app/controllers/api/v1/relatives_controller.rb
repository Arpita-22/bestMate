class  Api::V1::RelativesController < ApplicationController
    before_action :set_relative, only: [:show,:update,:destroy]
    skip_before_action :authorized, only: [:create, :update, :destroy, :show]

    def index
    @relatives = Relative.all
    render json: @relatives, status: 200
    end


    def create
    @relative = Relative.create(relative_params)
    render json: {relative: RelativeSerializer.new(@relative)}
    end

    def update
    @relative = Relative.find(params[:id])
    @relative.update(relative_params)
    render json: @relative, status: 200
    end

    def destroy
    @relative = Relative.find(params[:id])
    @relative.destroy
    render json: {message:"Zap! Note deleted"}
    end

    def show
    render json: @relative, status: 200
    end

    private
    def relative_params
      params.require(:relative).permit(:id, :name, :address, :age, :relationship, :distance, :notes, :user_id)
    end
  
    def set_relative
      @relative = Relative.find(params[:id])
    end
end
