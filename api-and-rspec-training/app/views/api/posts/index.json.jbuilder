if @filterName == "followings" && @user_id == @current_user.id
  json.posts do
    json.array! @current_user_following_posts do |post|
      json.id post.id
      json.content post.content
      json.user do
        json.id post.user.id
        json.username post.user.username
      end
      json.likes_count post.likes.count
      json.is_liked_by_current_user post.likes.exists?(user_id: @current_user.id)
      json.comments_count post.comments.count
    end
  end

  json.pagenation do
    json.current_page @current_user_following_posts.current_page
    json.total_pages @current_user_following_posts.total_pages
    json.total_count @current_user_following_posts.total_count
  end
elsif @user_id == @current_user.id
  json.posts do
    json.array! @current_user_posts do |post|
      json.id post.id
      json.content post.content
      json.user do
        json.id post.user.id
        json.username post.user.username
      end
      json.likes_count post.likes.count
      json.is_liked_by_current_user post.likes.exists?(user_id: @current_user.id)
      json.comments_count post.comments.count
    end
  end

  json.pagenation do
    json.current_page @current_user_posts.current_page
    json.total_pages @current_user_posts.total_pages
    json.total_count @current_user_posts.total_count
  end
else
  json.posts do
    json.array! @posts do |post|
      json.id post.id
      json.content post.content
      json.user do
        json.id post.user.id
        json.username post.user.username
      end
      json.likes_count post.likes.count
      json.is_liked_by_current_user post.likes.exists?(user_id: @current_user.id)
      json.comments_count post.comments.count
    end
  end

  json.pagenation do
    json.current_page @posts.current_page
    json.total_pages @posts.total_pages
    json.total_count @posts.total_count
  end
end
