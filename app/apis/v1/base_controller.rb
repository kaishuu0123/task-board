module V1
  class BaseController < ActionController::API
    before_action :authenticate_user!
  end
end
