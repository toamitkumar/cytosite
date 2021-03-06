class User < ActiveRecord::Base
  has_many :user_assessments
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :role

  def admin?
    role == 'admin'
  end

end
