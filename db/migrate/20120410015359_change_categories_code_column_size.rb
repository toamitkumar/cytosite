class ChangeCategoriesCodeColumnSize < ActiveRecord::Migration
  def self.up
  	change_column(:categories, :code, :string, :limit => 20)
  end

  def self.down
  	change_column(:categories, :code, :string, :limit => 10)
  end
end
