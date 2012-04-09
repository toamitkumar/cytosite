class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!

  def admin_resource?
    redirect_to not_authorized_path unless current_user.admin?
  end

  def category_format
    categories = Category.find(:all, :order => :sort_order)
    category_array = []
    categories.each do |category|
      category_array << [format_category_name(category), category.code]
    end
    category_array
  end

  private
  def format_category_name(category)
    name = ''
    category.level.times do
      name += '-- '
    end
    name += ' ' +category.name
  end

end
