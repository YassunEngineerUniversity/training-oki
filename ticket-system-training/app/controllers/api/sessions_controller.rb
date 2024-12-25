class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id # セッションにユーザIDを保存
      render :create
    else
      render json: { error: "無効なユーザネームかパスワードです。" }, status: :unauthorized
    end
  end

  def destroy
    reset_session
    cookies.delete(:_ticket_system_training_session)
    @current_user = nil
    render :destroy
  end
end
