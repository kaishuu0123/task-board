module V1
  class SessionsController < Devise::SessionsController
    before_action :rewrite_param_names, only: [:create]
    respond_to :json

    def new
      self.resource = resource_class.new(sign_in_params)
      clean_up_passwords(resource)
      yield resource if block_given?
      respond_with(resource, serialize_options(resource))
    end

    def create
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?

      render json: {
        email: resource.email,
        token: current_token
      }
    end

    # destroy is parent
    # DELETE /resource/sign_out
    def destroy
      signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
      yield if block_given?
      respond_to_on_destroy
    end

    private

    def respond_to_on_destroy
      head :no_content
    end

    def rewrite_param_names
      request.params[:user] = {
        email: request.params[:email],
        password: request.params[:password]
      }
    end

    def current_token
      request.env['warden-jwt_auth.token']
    end
  end
end
