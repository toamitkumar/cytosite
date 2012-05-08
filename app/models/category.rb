class Category < ActiveRecord::Base

	# set_primary_key "code"

	has_many :questions
	has_many :images

  def self.children(parent_id = nil)
    where(:parent_id => parent_id)
  end

end