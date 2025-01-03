class Api::UsersController < ApplicationController
  def me
    @current_user = current_user
    if @current_user
      render :me
    else
      render json: { error: "ユーザが見つかりませんでした。" }, status: :not_found
    end
  end
end
