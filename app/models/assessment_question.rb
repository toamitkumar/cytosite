class AssessmentQuestion < ActiveRecord::Base
  belongs_to :assessment
  belongs_to :question

  def self.create_questions_for_assessment(question_ids, assessment_id)
    question_ids.each do |question_id|
      AssessmentQuestion.create!(:question_id => question_id,
        :assessment_id => assessment_id)
    end
  end
end