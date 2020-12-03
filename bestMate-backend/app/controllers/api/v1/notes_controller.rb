class  Api::V1::NotesController < ApplicationController
    before_action :set_note, only: [:show,:update,:destroy]
    skip_before_action :authorized, only: [:create, :index, :destroy, :update, :show]

    def index
    @notes = Note.all
    render json: @relatives, status: 200
    end


    def create
    @note = Note.create(note_params)
    render json: {note: NoteSerializer.new(@note)}
    end

    def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    render json: @note, status: 200, include:[:user]
    end

    def destroy
    @note = note(params[:id])
    @note.destroy
    render json: {message:"Zap! Note deleted"}
    end

    def show
    render json: @note, status: 200
    end

    private
    def note_params
      params.require(:note).permit(:id, :description,:relative_id)
    end
  
    def set_note
      @note = Note.find(params[:id])
    end
end
