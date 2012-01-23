class UsersController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :update]

  def index
    @users = User.all
  end

  def edit
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    path = users_path
    begin      
      if !current_user.admin? and params[:id].to_i != current_user.id
        raise ActiveRecord::RecordInvalid('You cannot perform this action')
      end
      User.find(params[:id]).update_attributes!(params[:user])
      path = root_url unless current_user.admin?
    rescue ActiveRecord::RecordInvalid
      path = edit_user_path(params[:id])
    end
    redirect_to path
  end

end