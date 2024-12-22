module Authentication
  # ControllerやModelのコードをモジュール化するため
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_play_guide
  end

  private
    def authenticate_play_guide
      # "Bearer token"のような形式になるため、空白で区切り、tokenだけを取得する
      token = request.headers['Authorization']&.split(' ')&.last
      @current_play_guide = PlayGuide.find_by(api_token: token)

      unless @current_play_guide
        render json: { error: "認証に失敗しました。" }, status: :unauthorized
      end
    end
end