import { Post } from "@/models/Post";

type PostProps = {
    post: Post;
};

export default function PostCard({ post }: PostProps) {
    return (
      <div className="...">
        <h2 className="...">
          {post.title}
        </h2>
        <p className="...">{post.body}</p>
      </div>
    );
}