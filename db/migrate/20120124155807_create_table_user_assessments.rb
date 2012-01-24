class CreateTableUserAssessments < ActiveRecord::Migration
  def self.up
    create_table 'user_assessments' do |t|
      t.integer :user_id
      t.integer :assessment_id
      t.string :response, :limit => 2000
      t.date :end_time
      t.timestamps
    end
  end

  def self.down
    drop_table 'user_assessments'
  end
end
