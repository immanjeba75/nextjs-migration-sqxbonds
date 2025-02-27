// export interface Blog {
//     id: string | number;
//     title: string;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
//     // Add any other blog properties
//   }
  
  export interface BlogsState {
    blogs: {
      items: Blog[];
      total: number;
      loading: boolean;
      error: string | null;
    };
    currentBlog: {
      data: Blog | null;
      loading: boolean;
      error: string | null;
    };
    createBlog: {
      loading: boolean;
      error: string | null;
      success: boolean;
    };
    updateBlog: {
      loading: boolean;
      error: string | null;
      success: boolean;
    };
    deleteBlog: {
      loading: boolean;
      error: string | null;
      success: boolean;
    };
  }
  export interface Blog {
    blog_id: number;
    blog_title: string;
    blog_description: string;
    blog_image: string;
    category: string;
    created_by: string;
    updated_by: string | null;
    created_date: string;
    updated_date: string;
}

export interface BlogResponse {
    page_no: number;
    per_page: number;
    start_record: number;
    end_record: number;
    total_records: number;
    blogs: Blog[];
}
  export interface BlogFilters {
    page?: number;
    perPage?: number;
    title?: string;
    description?: string;
    [key: string]: any;
  }