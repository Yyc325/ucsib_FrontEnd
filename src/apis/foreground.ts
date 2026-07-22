import Axios from "@/utils/axios";


export interface CommunityComment {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

export interface SearchResult {
  id: string;
  record_id: number;
  source: "notice" | "community";
  title: string;
  subtitle: string;
  snippet: string;
  author: string;
  timestamp: string | null;
  score: number;
  article?: Record<string, any>;
}

export const getCommunityComments = (limit = 30) => {
  return Axios.request<any>({
    url: "/api/comments/",
    method: "GET",
    params: { limit },
  });
};

export const createCommunityComment = (content: string) => {
  return Axios.request<any>({
    url: "/api/comments/",
    method: "POST",
    data: { content },
  });
};

export const searchSite = (query: string, scope = "all", limit = 12) => {
  return Axios.request<any>({
    url: "/api/search/",
    method: "GET",
    params: { q: query, scope, limit },
  });
};
