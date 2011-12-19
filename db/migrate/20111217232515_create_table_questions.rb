class CreateTableQuestions < ActiveRecord::Migration
  def self.up
    create_table 'questions' do |t|
      t.string :question, :limit => 512, :null => false
      t.string :explanation, :limit => 1024, :null => false
      t.string :category_code, :limit => 20
      t.integer :sort_order, :limit => 10
      t.boolean :published
      t.timestamps
    end
  end

  def self.down
    drop_table 'questions'
  end
end