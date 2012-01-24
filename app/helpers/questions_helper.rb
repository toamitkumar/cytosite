module QuestionsHelper

  def can_answer?
    return true if @user_assessment.nil?
    return true if @user_assessment.response[params[:id].to_i].nil?
    @user_assessment.response[params[:id].to_i][:skipped]
  end

  def compute_next_question_path
    return question_path(2, :assessment_id => @assessment.id) if @user_assessment.nil?
    return summary_assessment_path(@assessment.id) if complete?
    responses = @user_assessment.response
    id = nil
    start = params[:id].to_i + 1
    (start..10).each do |key|
      question_response = responses[key]
      if question_response[:skipped]
        id = key
        break
      end
    end
    id = start if id.nil?
    question_path(id, :assessment_id => @assessment.id)
  end

  def complete?
    return false if @user_assessment.nil?
    responses = @user_assessment.response
    count = 0
    responses.each do |key, response|
      count += 1 if !response[:skipped]
    end
    count == 10
  end

  def compute_previous_question_path
    return assessment_path(@assessment.id) if complete?
    responses = @user_assessment.response
    id = nil
    start = params[:id].to_i - 1
    start.downto(1) do |key|
      question_response = responses[key]
      if question_response[:skipped]
        id = key
        break
      end
    end
    id = start if id.nil?
    return summary_assessment_path(@assessment.id) if id == 1 and !responses[1][:skipped]
    question_path(id, :assessment_id => @assessment.id)
  end

end