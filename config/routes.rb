Cytosite::Application.routes.draw do
  devise_for :users do
    get "/users/sign_out", :to => "sessions#destroy", :as => "destroy_user_session"
  end
  
  match 'images/tags' => 'images#tags', :as => 'image_tags'
  match 'overview' => 'home#overview', :as => 'overview'

  resources :questions, :images, :tags

  root :to => "home#index"

end