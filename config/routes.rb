Iframedemo::Application.routes.draw do

  root to: "home#index"
  
  [:modals, :default, :no_icon].each do |action|
    get action.to_s => "home##{action}"
  end
  
  resources :unicorns
  
end
