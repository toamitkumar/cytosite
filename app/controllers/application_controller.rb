class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!

  def admin_resource?
    redirect_to not_authorized_path unless current_user.admin?
  end

  private

  def category_format
   @categories = []
   Category.find(:all, :order => :sort_order).each do |category|
     @categories << [format_category_name(category), category.code]
   end
   @categories
 end

 def format_category_name(category)
   name = []
   category.level.times do
     name << '-- '
   end
   name << category.name
   name.join('')
 end

 def initialize_categories
   @categories = Category.find(:all, :order => :sort_order).map{|c| [c.name, c.code]}
 end
end