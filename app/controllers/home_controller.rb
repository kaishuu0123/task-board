class HomeController < ActionController::Base
  include ActionController::RequestForgeryProtection
  include ActionController::ImplicitRender
  include ActionView::Layouts

  before_action :skip_session

  layout 'application'

  def index
  end

  private
  ## Skip sessions and cookies for Rails API
  def skip_session
    request.session_options[:skip] = true
  end

end
