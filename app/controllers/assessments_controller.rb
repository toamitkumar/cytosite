class AssessmentsController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index, :summary, :reset]
  before_filter :category_format, :only => [:new, :edit]

  def index
    @assessments = if(params[:category_code].blank?)
      Assessment.all
    else
      Assessment.where(:category_code => params[:category_code])
    end
    all_categories = Category.find_all_by_code(@assessments.collect{|a| a.category_code})
    @category_hash = Hash[*all_categories.collect { |cat| [cat.code, cat.name]}.flatten]
    @selected_category = params[:category_code]
  end

  def show
    @assessment = Assessment.find(params[:id])
    @user_assessment = UserAssessment.find_by_user_id_and_assessment_id(current_user.id, params[:id])
    @question_id = AssessmentQuestion.find_by_assessment_id_and_order(@assessment, 1).question_id
  end

  def new
    @questions = Question.find_all_by_category_code(@categories[0][1])
  end

  def create
    Assessment.transaction do
      assessment = Assessment.create!(params[:assessment])
      AssessmentQuestion.create_questions_for_assessment(params[:questions], assessment.id)
    end
    redirect_to assessments_path
  end

  def edit
    @assessment = Assessment.find(params[:id], :include => :assessment_questions)
    @questions = Question.find_all_by_category_code(@assessment.category_code)
    @assessment_questions = Hash[*@assessment.assessment_questions.collect { |q| [q.order, q.question_id]}.flatten]
  end

  def update
    Assessment.transaction do
      Assessment.find(params[:id]).update_attributes!(params[:assessment])
      AssessmentQuestion.destroy_all(:assessment_id => params[:id])
      AssessmentQuestion.create_questions_for_assessment(params[:questions], params[:id])
    end
    redirect_to assessments_path
  end

  def destroy
    Assessment.transaction do
      Assessment.find(params[:id]).destroy
      AssessmentQuestion.destroy_all(:assessment_id => params[:id])
    end
    redirect_to assessments_path
  end

  def summary
    @assessment = Assessment.find(params[:id], :include => :questions)
    @user_assessment = UserAssessment.find_by_user_id_and_assessment_id(current_user.id, @assessment.id)
    @assessment_question = AssessmentQuestion.find_by_order_and_assessment_id(10, params[:id])
    @all_assessment_questions = AssessmentQuestion.find_all_by_assessment_id(params[:id])
    @question = Question.find(@assessment_question.question_id, :include => :answers)
    if(params[:option].blank?)
      UserAssessment.store_with_response(@assessment_question, current_user.id,
        true, nil, nil)
    else
      @correct_answer = Answer.find_by_question_id_and_correct(@question.id, true)
      UserAssessment.store_with_response(@assessment_question, current_user.id,
        false, params[:option].to_i, @correct_answer.id)
    end
  end

  def reset
    UserAssessment.find_by_user_id_and_assessment_id(current_user.id, params[:id]).destroy
    redirect_to assessment_path(params[:id])
  end

end