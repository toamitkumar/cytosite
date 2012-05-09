class Category < ActiveRecord::Base

	has_many :questions
	has_many :images

  def self.children(parent_id = nil)
    where(:parent_id => parent_id)
  end

end