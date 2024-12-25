Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  namespace :api, defaults: { format: :json } do
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    post "play_guides/token", to: "play_guides#token"
    get "ticket_views/me", to: "ticket_views#me"
    resources :ticket_views, only: [ :index, :create ]
    resources :tickets, only: [] do
      member do
        post "used", to: "tickets#used"
        post "transfer", to: "tickets#transfer"
      end
    end
  end
end
