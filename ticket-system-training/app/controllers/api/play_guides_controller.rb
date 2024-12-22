class Api::PlayGuidesController < ApplicationController
  def token
    # nameとpasswordで該当するプレイガイドが存在するかチェック
    @play_guide = PlayGuide.find_by(name: play_guide_params[:name])

    if @play_guide && @play_guide.authenticate(play_guide_params[:password])
      @play_guide.regenerate_api_token
      render :token
    else
      render json: { error: "トークンが取得できません" }, status: :unprocessable_entity
    end
  end

  private
    def play_guide_params
      params.require(:play_guide).permit(:name, :password)
    end
end
