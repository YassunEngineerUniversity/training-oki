module Authentication
  # ControllerやModelのコードをモジュール化するため
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_play_guide
  end

  private
    def authenticate_play_guide
      # "Bearer token"のような形式になるため、空白で区切り、tokenだけを取得する
      token = request.headers["Authorization"]&.split(" ")&.last
      play_guide = PlayGuide.find_by(api_token: token)

      if play_guide && play_guide.api_token_valid?
        @current_play_guide = play_guide
      else
        render json: { error: "認証に失敗しました。もしくは、APIトークンの期限が切れています。" }, status: :unauthorized
      end
    end
end
