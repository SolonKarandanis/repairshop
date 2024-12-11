"use server";

import { getApiUrl } from "@/lib/utils/getApirUrl";
import { handleError } from "@/lib/utils/handleResponseError";
import { Post } from "@/models/Post";

export const getPosts = async (
    offset: number,
    limit: number
  ): Promise<Post[]> => {
    const url = getApiUrl(offset, limit);
  
    try {
      const response = await fetch(url);
      const data = (await response.json()) as Post[];
      if (!response.ok) {
        throw await handleError(response);
      }
      return data;
    } catch (error: unknown) {
      console.error(error);
      throw new Error(`An error occurred: ${error}`);
    }
};