import { getPosts } from "@/app/actions/getPosts";
import PostList from "@/app/components/PostList"
import { POSTS_PER_PAGE } from "@/constants/constants";

const PostsPage = async () =>{
    const initialPosts = await getPosts(0, POSTS_PER_PAGE);
    return (
        <>
            <PostList initialPosts={initialPosts} />
        </>
    )
}

export default PostsPage