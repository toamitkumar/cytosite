class CreateTableCategories < ActiveRecord::Migration
  def self.up
    create_table 'categories' do |t|
      t.string :name, :limit => 255, :null => false
      t.string :code, :limit => 10
      t.integer :parent_id
      t.integer :level, :limit => 10
      t.integer :sort_order, :limit => 10
      t.timestamps
    end
  end

  def self.down
    drop_table 'categories'
  end
end
