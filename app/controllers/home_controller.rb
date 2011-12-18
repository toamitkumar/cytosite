class HomeController < ApplicationController

  def index
  end

  def overview
    @categories = Category.all(:order => :sort_order)
  end

end
