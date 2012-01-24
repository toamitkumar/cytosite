module AssessmentsHelper

  def response_type(assessment_question)
    question_response = @user_assessment.response[assessment_question.order]
    text = if question_response[:skipped]
      'Skipped'
    else
      if question_response[:correct]
        'Correct'
      else
        'Wrong'
      end
    end
    text
  end

  def link_question_if_skipped(assessment_question)
    question_response = @user_assessment.response[assessment_question.order]
    question = @assessment.questions.select{|q| q.id == assessment_question.question_id}.first.question
    html = if question_response[:skipped]
      link_to(question, question_path(assessment_question.order, :assessment_id => @assessment.id))
    else
      question
    end
    html
  end

  def total_questions
    @user_assessment.response.keys.size
  end

  def count_for(param)
    count = 0
    @user_assessment.response.each do |key, value|
      count += 1 if value[param.to_sym]
    end
    count
  end

  def count_for_wrong
    count = 0
    @user_assessment.response.each do |key, value|
      count += 1 if (!value[:correct] && !value[:skipped])
    end
    count
  end

  def percent
    count_for('correct').to_f / total_questions.to_f * 100
  end

  def pass
    percent > 40 ? 'Pass' : 'Fail'
  end

end