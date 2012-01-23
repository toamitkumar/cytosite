Cytosite::Application.routes.draw do
  devise_for :users do
    get "/users/sign_out", :to => "sessions#destroy", :as => "destroy_user_session"
  end
  
  match 'images/tags' => 'images#tags', :as => 'image_tags'
  match 'overview' => 'home#overview', :as => 'overview'
  match 'not_authorized', :to => 'home#not_authorized'

  resources :tags, :assessments

  resources :questions do
    member do
      get :assessment_questions
    end
  end

  resources :images do
    member do
      get :category_images
    end
  end

  root :to => "home#index"

end