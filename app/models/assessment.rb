class Assessment < ActiveRecord::Base
  has_many :questions, :through => :assessment_questions
  has_many :assessment_questions
  has_many :user_assessments
  belongs_to :category, :foreign_key => :category_code, :primary_key => :code
end
