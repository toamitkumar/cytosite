require 'image_science'
class QuestionsController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :correct_answer]

  def index
    @questions = Question.all
    @categories = Hash[*Category.all.collect { |c| [c.code, c.name]}.flatten]
  end

  def show
    @assessment = Assessment.find(params[:assessment_id])
    @assessment_question = AssessmentQuestion.find_by_order_and_assessment_id(params[:id], @assessment.id)
    @question = Question.find(@assessment_question.question_id, :include => :answers)
    @image = Image.find(@question.image_id) unless @question.image_id.blank?
    @assessment_question = AssessmentQuestion.find_by_question_id_and_assessment_id(@question.id, @assessment.id)
  end

  def edit
    @codes = ['A', 'B', 'C', 'D']
    @question = Question.find(params[:id], :include => :answers)
    @categories = Category.all(:order => 'sort_order').collect {|c| [c.name, c.code]}
    @images = Image.find_all_by_category_code(@question.category_code)
  end

  def new
    @categories = Category.all(:order => 'sort_order').collect {|c| [c.name, c.code]}
    @images = Image.find_all_by_category_code('overview')
  end

  def create    
    Question.transaction do      
      question = Question.create!(params[:question])
      Answer.create_answers_for_question(params, question.id)
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

  def assessment_questions
    @questions = Question.find_all_by_category_code(params[:id])
    render :partial => 'assessment_questions'
  end

  def destroy
    Question.find(params[:id]).destroy
    redirect_to questions_path
  end

  def correct_answer
    @question = Question.find(params[:id])
    @correct_answer = Answer.find_by_question_id_and_correct(@question.id, true)
    @is_correct = @correct_answer.id == params[:option].to_i
    render :partial => 'correct_answer'
  end

end
