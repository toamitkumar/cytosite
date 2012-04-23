class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!

  def admin_resource?
    redirect_to not_authorized_path unless current_user.admin?
  end

  private
  def initialize_categories
    @categories = Category.find(:all, :order => :sort_order)
  end
end
