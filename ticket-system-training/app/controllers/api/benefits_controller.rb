class Api::BenefitsController < ApplicationController
  before_action :authenticate_user! # セッションを保持しているかアクションの前に確認

  def used
    benefit_params = params[:id]

    benefit = current_user.benefits.find_by(id: benefit_params)

    # 特典が見つからない場合
    unless benefit
      render json: { error: "特典が存在しないです。" }, status: :not_found
      return
    end

     # すでに消し込み済みであるかのチェック（nilではないか or 空ではないか）
     if benefit.used_time.present?
      render json: { error: "すでに消し込み済みの特典です。" }, status: :unprocessable_entity
      return
    end

    # 消し込み処理
    if benefit.update(used_time: Time.zone.now)
      render :used
    else
      render json: { error: "消し込み処理中にエラーが発生しました。" }, status: :unprocessable_entity
    end
  end
end
