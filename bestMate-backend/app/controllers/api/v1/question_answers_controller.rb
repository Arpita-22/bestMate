class Api::V1::QuestionAnswersController < ApplicationController
    before_action :set_question_answer, only: [:show,:update]
    skip_before_action :authorized, only: [:create, :index, :destroy, :update, :show]

    def index
    #@question_answers = QuestionAnswer.all
    @question_answers = QuestionAnswer.where("question like ?", params[:askedQ])
    render json: @question_answers, status: 200
    end
    
    
    def create
    @question_answer = QuestionAnswer.create(question_answer_params)
    render json: @question_answer
    end

    def show
    @question_answer = QuestionAnswer.find(params[:question])
    render json: @question_answer, status: 200
    end
    
    private
    def question_answer_params
    params.require(:question_answer).permit(:id, :question, :answer)
    end
    
    def set_question_answer
    @question_answer = QuestionAnswer.find(params[:id])
    end
end
