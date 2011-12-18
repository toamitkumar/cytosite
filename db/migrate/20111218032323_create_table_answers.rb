class CreateTableAnswers < ActiveRecord::Migration
  def self.up
    create_table 'answers' do |t|
      t.string :option, :limit => 512, :null => false
      t.integer :question_id
      t.boolean :correct
      t.timestamps
    end
  end

  def self.down
    drop_table 'answers'
  end
end
