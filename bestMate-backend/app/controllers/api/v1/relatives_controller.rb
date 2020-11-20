class  Api::V1::RelativesController < ApplicationController

    def index
        @relatives = Relative.all
        # byebug
        render json: @relatives
    end
end
