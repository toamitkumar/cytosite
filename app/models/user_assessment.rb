class UserAssessment < ActiveRecord::Base
  belongs_to :user
  belongs_to :assignment
  serialize :response

  def self.store_with_response(assessment_question, user_id, skipped, option, correct_answer_id)
    user_assessment = find_or_initialize_by_user_id_and_assessment_id(user_id, assessment_question.assessment_id)
    response = user_assessment.response
    if response.nil?
      response = {}
      user_assessment.response = response
    end
    question_response = response[assessment_question.order]
    if question_response.nil?
      question_response = {:question_id => assessment_question.question_id,
        :skipped => skipped}
      response[assessment_question.order] = question_response
    end
    unless skipped
      question_response[:selected_option] = option
      question_response[:right_option] = correct_answer_id
      question_response[:correct] = option == correct_answer_id
      question_response[:skipped] = false
    end
    user_assessment.end_time = Time.now if all_questions_answered(user_assessment.response)
    user_assessment.save!
  end

  private
  def self.all_questions_answered(responses)
    count = 0
    responses.each do |key, response|
      count += 1 if !response[:skipped]
    end
    count == 10
  end
  
end