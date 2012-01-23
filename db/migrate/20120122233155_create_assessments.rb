class CreateAssessments < ActiveRecord::Migration
  def self.up
    create_table 'assessments' do |t|
      t.string :name, :limit => 255, :null => false
      t.string :description, :limit => 1024, :null => false
       t.string :category_code, :limit => 20
      t.timestamps
    end
    create_table 'assessment_questions' do |t|
      t.integer :assessment_id
      t.integer :question_id
      t.timestamps
    end
  end

  def self.down
    drop_table 'assessments'
    drop_table 'assessment_questions'
  end
end
