class Question < ActiveRecord::Base
  has_many :answers, :dependent => :destroy
  belongs_to :assessment, :through => :assessment_questions
end