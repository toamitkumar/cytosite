class Question < ActiveRecord::Base
  has_many :answers, :dependent => :destroy
  has_many :assessment, :through => :assessment_questions
  has_many :assessment_questions
end