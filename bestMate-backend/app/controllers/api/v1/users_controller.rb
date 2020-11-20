class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :index]

    def index
         @users = User.all
         render json: @users
    end

    def profile
        render json: {user: UserSerializer.new(current_user)}, status: :accepted
    end

    # def login
    #     @user = User.find_by(name: params[:name])
    #     if @user && @user.authenticate(params[:password]) 
    #         token = encode_token({user_id: @user.id})
    #         render json: {user:UserSerializer.new(@user), token: @token}
    #     else
    #         render json: {error: "Incorrect name or password"}
    #     end
    # end

    def create
        @user = User.new(user_params)
        if @user.save
            @token = encode_token(user_id: @user.id)
            render json: {user: UserSerializer.new(@user), jwt: @token} , status: :created
        else
            render json: {error: " failed to create user"}, status: :not_acceptable
        end
    end

    private

    def user_params
        params.require(:user).permit(:name,:address,:age,:password)
    end
end
