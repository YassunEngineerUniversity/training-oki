class Api::UsersController < ApplicationController
  before_action :authenticate_user! # セッションを保持しているかアクションの前に確認

  def search
    email_params = params[:email]

    unless email_params
      render json: { error: "パラメータが必要です。" }, status: :unprocessable_entity
    end

    @user = User.find_by(email: email_params)

    if @user
      render :search
    else
      render json: { message: "ユーザが見つかりませんでした。" }, status: :not_found
    end
  end

  def me
    @current_user = current_user
    if @current_user
      render :me
    else
      render json: { error: "ユーザが見つかりませんでした。" }, status: :not_found
    end
  end
end
