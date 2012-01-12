class CreateTableImages < ActiveRecord::Migration
  def self.up
    create_table 'images' do |t|
      t.string :name, :limit => 512, :null => false
      t.string :description, :limit => 1024, :null => false
      t.string :format, :limit => 10
      t.string :category_code, :limit => 20
      t.timestamps
    end
    add_column :questions, :image_id, :integer
  end

  def self.down
    drop_table 'images'
    remove_column :questions, :image_id
  end
end
