Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  namespace :api, defaults: { format: :json } do
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    post "play_guides/token", to: "play_guides#token"
    get "users/me", to: "users#me"
    get "users/search", to: "users#search"
    get "ticket_views/mine", to: "ticket_views#mine"
    get "tickets/mine", to: "tickets#mine"
    resources :ticket_views, only: [ :index, :create, :show ]
    resources :tickets, only: [] do
      member do
        post "used", to: "tickets#used"
        post "send", to: "tickets#transfer_send"
        post "receive", to: "tickets#transfer_receive"
      end
    end
    resources :benefits, only: [] do
      member do
        post "used", to: "benefits#used"
      end
    end
  end
end
