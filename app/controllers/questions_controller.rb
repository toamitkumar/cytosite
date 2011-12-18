class QuestionsController < ApplicationController

  def index
    @questions = Question.all
    @categories = Hash[*Category.all.collect { |c| [c.code, c.name]}.flatten]
  end

  def show
    @question = Question.find(params[:id])
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def new
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def create
    Question.create!(params[:question])
    redirect_to questions_path
  end

  def update
    Question.find(params[:id]).update_attributes!(params[:question])
    redirect_to questions_path
  end

  def destroy
    Question.find(params[:id]).destroy
    redirect_to questions_path
  end

end
