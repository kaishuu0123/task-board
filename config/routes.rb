Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  match '/omniauth_finished/:id/finish_signup' => 'omniauth_finished#finish_signup', via: [:get, :post], as: :finish_signup

  devise_for :users,
             controllers: {
               omniauth_callbacks: 'omniauth_callbacks',
               registrations: 'registrations',
               confirmations: 'confirmations'
             }

  scope :api, format: 'json' do
    scope :v1 do
      resources :projects, controller: 'v1/projects'

      put '/tasks/row_orders', controller: 'v1/tasks', action: 'row_orders'
      resources :tasks, controller: 'v1/tasks'

      devise_scope :user do
        post :login, controller: 'v1/sessions', action: 'create'
        delete :logout, controller: 'v1/sessions', action: 'destroy'
        post :sign_up, controller: 'v1/registrations', action: 'create'
      end
    end
  end
end
