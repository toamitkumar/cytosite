class Assessment < ActiveRecord::Base
  has_many :questions, :through => :assessment_questions
  has_many :assessment_questions
end
