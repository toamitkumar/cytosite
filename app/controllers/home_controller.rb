class HomeController < ApplicationController
  layout 'common'

  def index
  end

  def overview
    @categories = Category.all(:order => :sort_order)
  end

  def not_authorized
  end

end
