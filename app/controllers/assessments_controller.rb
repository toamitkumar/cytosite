class AssessmentsController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index]

end