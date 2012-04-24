class Category < ActiveRecord::Base
	has_many :questions

  def self.children(parent_id = nil)
    where(:parent_id => parent_id)
  end

end