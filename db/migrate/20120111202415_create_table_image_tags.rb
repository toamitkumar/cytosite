class CreateTableImageTags < ActiveRecord::Migration
  def self.up
    create_table 'image_tags' do |t|
      t.integer :image_id
      t.string :note, :limit => 512, :null => false
      t.string :author, :limit => 512, :null => false
      t.decimal :left, :precision => 10, :scale => 5
      t.decimal :top, :precision => 10, :scale => 5
      t.decimal :width, :precision => 10, :scale => 5
      t.decimal :height, :precision => 10, :scale => 5
      t.timestamps
    end
  end

  def self.down
    drop_table 'image_tags'
  end
end