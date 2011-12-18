class Answer < ActiveRecord::Base
  belongs_to :question

  def self.create_answers_for_question(params, question_id)
    (0..3).each do |i|
      option_sym = "option#{i}".to_sym
      params[option_sym][:question_id] = question_id
      params[option_sym][:correct] =  i == params[:correct_option].to_i
      Answer.create!(params[option_sym])
    end
  end

end