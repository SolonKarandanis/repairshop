"use client";

import { POSTS_PER_PAGE } from "@/constants/constants";
import { Post } from "@/models/Post";
import { useCallback, useEffect, useState } from "react";
import { getPosts } from "../actions/getPosts";
import PostCard from "./PostCard";
import { useInView } from "react-intersection-observer";

type PostListProps = {
    initialPosts: Post[];
};

export default function PostList({ initialPosts }: PostListProps){
    const [offset, setOffset] = useState(POSTS_PER_PAGE);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [scrollTrigger, isInView] = useInView();

    const loadMorePosts = useCallback(async() => {
        if (hasMoreData) {
          const apiPosts = await getPosts(offset, POSTS_PER_PAGE);
    
          if (apiPosts.length == 0) {
            setHasMoreData(false);
          }
    
          setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
          setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
        }
    },[hasMoreData,offset]);

    useEffect(() => {
        if (isInView && hasMoreData) {
          loadMorePosts();
        }
    }, [isInView, hasMoreData,loadMorePosts]);

    return (
        <>
            <div className="...">
                {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="...">
            {(hasMoreData && <div ref={scrollTrigger}>Loading...</div>) || (
                <p className="text-slate-600">No more posts to load</p>
            )}
            </div>
        </>
    );
}