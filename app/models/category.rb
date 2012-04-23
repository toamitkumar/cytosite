class Category < ActiveRecord::Base

  def self.children(parent_id = nil)
    where(:parent_id => parent_id)
  end

end