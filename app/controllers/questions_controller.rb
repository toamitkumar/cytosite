class QuestionsController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :correct_answer, :correct_option]
  before_filter :category_format, :only => [:index, :new, :edit]

  def index
    @questions = Question.all
  end

  def show
    @assessment = Assessment.find(params[:assessment_id])
    @assessment_question = AssessmentQuestion.find_by_order_and_assessment_id(params[:id], @assessment.id)
    @question = Question.find(@assessment_question.question_id, :include => :answers)
    @image = Image.find(@question.image_id) unless @question.image_id.blank?    
    unless params[:id].to_i == 1
      previous_assessment_question = AssessmentQuestion.find_by_order_and_assessment_id(params[:id].to_i - 1, @assessment.id)
      UserAssessment.store_with_response(previous_assessment_question, current_user.id,
        true, nil, nil)
    end
    @user_assessment = UserAssessment.find_by_user_id_and_assessment_id(current_user.id, @assessment.id)
  end

  def edit
    @codes = ['A', 'B', 'C', 'D']
    @question = Question.find(params[:id], :include => :answers)
    @images = Image.find_all_by_category_code(@question.category_code)
  end

  def new
    @images = Image.find_all_by_category_code('overview')
    @codes = ['A', 'B', 'C', 'D']
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
    assessment_question = AssessmentQuestion.find_by_assessment_id_and_question_id(params[:assessment_id], params[:id])
    UserAssessment.store_with_response(assessment_question, current_user.id,
      false, params[:option].to_i, @correct_answer.id)
    render :partial => 'correct_answer'
  end

  def correct_option
    @question = Question.find(params[:id])
    @correct_answer = Answer.find_by_question_id_and_correct(@question.id, true)   
    order = AssessmentQuestion.find_by_assessment_id_and_question_id(params[:assessment_id], params[:id]).order
    @user_response = UserAssessment.find_by_user_id_and_assessment_id(current_user.id, params[:assessment_id]).response[order]
    @is_correct = @user_response[:selected_option] == @user_response[:right_option]
    render :partial => 'correct_option'
  end

end
