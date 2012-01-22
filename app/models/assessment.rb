class Assessment < ActiveRecord::Base
  has_many :questions, :through => :assessment_questions
end
