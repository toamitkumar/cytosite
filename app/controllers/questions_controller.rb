require 'image_science'
class QuestionsController < ApplicationController

  def index
    @questions = Question.all
    @categories = Hash[*Category.all.collect { |c| [c.code, c.name]}.flatten]
  end

  def show
    @codes = ['A', 'B', 'C', 'D']
    @question = Question.find(params[:id], :include => :answers)
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def new
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def create    
    Question.transaction do      
      question = Question.create!(params[:question])
      Answer.create_answers_for_question(params, question.id)
      format = params[:upload]['datafile'].original_filename.split('.').last
      ImageFile.save(params[:upload], question.id, format)
      ImageFile.save_thumbnail(question.id, format)
    end
    redirect_to questions_path
  end

  def update
    Question.transaction do
      Question.find(params[:id]).update_attributes!(params[:question])
      Answer.destroy_all(['question_id = ?', params[:id]])
      Answer.create_answers_for_question(params, params[:id])
    end
    redirect_to questions_path
  end

  def destroy
    Question.find(params[:id]).destroy
    redirect_to questions_path
  end

end
