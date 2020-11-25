class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :index, :destroy, :update]

    def index
         @users = User.all
         render json: @users
    end

    def show
        render json: {user: UserSerializer.new(current_user)}, status: :accepted
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
# we can also write User.new(user_params) and if user.save
    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: {user: UserSerializer.new(@user), jwt: @token} , status: :created
        else
            render json: {error: " failed to create user"}, status: :not_acceptable
        end
    end

    def update
        @user = User.find(params[:id])
        @user.update(user_params)
        render json: @user, status: 200
      end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        render json: {message:"Zap! user deleted"}
    end

    private

    def user_params
        params.require(:user).permit(:id,:name,:address,:age,:password,:password_confirmation)
    end
end
