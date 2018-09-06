module V1
  class RegistrationsController < Devise::RegistrationsController
    before_action :rewrite_param_names, only: [:create]
    respond_to :json

    def create
      build_resource(sign_up_params)

      resource.save

      yield resource if block_given?
      if resource.persisted?
        if resource.active_for_authentication?
          # set_flash_message! :notice, :signed_up
          sign_up(resource_name, resource)
          # respond_with resource, location: after_sign_up_path_for(resource)
          render(json:
            {
              message: 'Registration Successful. Please login.',
              status: 200
            }) && return
        else
          # set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
          expire_data_after_sign_in!
          # respond_with resource, location: after_inactive_sign_up_path_for(resource)
          render(json:
            {
              message: 'Registration Successful. Sent confirmation to your email address.',
              status: 200
            }) && return
        end
      else
        clean_up_passwords resource
        set_minimum_password_length
        render(json:
          {
            message: 'Already exists. Please login',
            status: 200
          }) && return
      end
    end

    private
    def render_resource(resource)
      if resource.errors.empty?
        render json: resource
      else
        validation_error(resource)
      end
    end

    def validation_error(resource)
      render json: {
        errors: [
          {
            status: '400',
            title: 'Bad Request',
            detail: resource.errors,
            code: '100'
          }
        ]
      }, status: :bad_request
    end

    def rewrite_param_names
      request.params[:user] = {
        email: request.params[:email],
        password: request.params[:password],
        password_confirmation: request.params[:password_confirmation]
      }
    end
  end
end
