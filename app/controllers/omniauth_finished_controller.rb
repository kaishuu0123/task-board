class OmniauthFinishedController < ActionController::Base
  before_action :authenticate_user!, except: :finish_signup

  def finish_signup
    @user = User.find(params[:id])
    if request.post? && @user.update(user_params)
      @user.send_confirmation_instructions unless @user.confirmed?
      redirect_to root_url # メールを送った旨をパラメータで渡す
    end
  end

  private

  # user_paramsにアクセスするため。
  def user_params
    accessible = [ :username, :email ]
    accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
    params.require(:user).permit(accessible)
  end
end
