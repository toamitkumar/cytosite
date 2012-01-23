class AssessmentsController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index]

  def index
    @assessments = Assessment.all
    @categories = Hash[*Category.all.collect { |c| [c.code, c.name]}.flatten]
  end

  def new
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
    @questions = Question.find_all_by_category_code('overview')
  end

  def create
    Assessment.transaction do
      assessment = Assessment.create!(params[:assessment])
      AssessmentQuestion.create_questions_for_assessment(params[:questions], assessment.id)
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

end