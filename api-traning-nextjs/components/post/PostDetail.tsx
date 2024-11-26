"use client"
import { deleteLike } from "@/actions/like/deleteLike"
import { updateLike } from "@/actions/like/updateLike"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PostDetailType } from "@/types/post/types"
import { formatDate } from "@/utils/formatDate"
import { Heart, MessageCircle } from 'lucide-react'
import { useState } from "react"

interface PostDetailProps {
  post: PostDetailType
}

const PostDetail = ({post}:PostDetailProps) => {
  const [postState, setPostState] = useState(post);

  const handleUpdateLike = updateLike.bind(null,String(post.id)) // server actionsに引数を渡すためにbindを使用
  const handleDeleteLike = deleteLike.bind(null, String(post.id))

  const handleLike = async () => {
    if(postState.is_liked_by_current_user) {
      const newLikesCount = await handleDeleteLike();
      setPostState((prevState) => ({
        ...prevState,
        likes_count: newLikesCount.likes_count,
        is_liked_by_current_user: false
      }));
    } else {
      const newLikesCount = await handleUpdateLike();
      setPostState((prevState) => ({
        ...prevState,
        likes_count: newLikesCount.likes_count,
        is_liked_by_current_user: true
      }));
    }
  }
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://github.com/shadcn.png`} alt={postState.user.username} />
          <AvatarFallback>{postState.user.username}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold">{postState.user.username}</h2>
          <p className="text-sm text-muted-foreground">@{postState.user.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">{postState.content}</p>
        <time className="text-sm text-muted-foreground">
          {formatDate(postState.created_at)}
        </time>
      </CardContent>
      <CardFooter className="flex justify-start gap-1">
        <form action={handleLike}>
          <Button type="submit" variant="ghost" size="sm">
            {postState.is_liked_by_current_user? (
              <Heart color="red" fill="red" stroke="none" className="w-4 h-4 mr-2" />
            ):(
              <Heart className="w-4 h-4 mr-2" />
            )}
            { postState.likes_count }
          </Button>
        </form>
        <Button variant="ghost" size="sm" aria-label={`コメント ${postState.comments.length}件`}>
          <MessageCircle className="w-5 h-5 mr-2" />
          <span aria-hidden="true">{postState.comments.length}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PostDetail