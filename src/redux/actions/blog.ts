import { Dispatch } from 'redux';
import { api } from '../../services/api';
import { blogEndpoints } from '../../services/apiVariables';
import { Toast } from '../../services/toast';
import { BLOG_ACTIONS } from '../actionType/blog';
import { Blog, BlogFilters } from '../../types/blog';

// Define ActionTypes
interface FetchBlogsRequestAction {
    type: typeof BLOG_ACTIONS.GET_ALL_BLOGS_REQUEST;
}

interface FetchBlogsSuccessAction {
    type: typeof BLOG_ACTIONS.GET_ALL_BLOGS_SUCCESS;
    payload: {
        items: Blog[];
        total: number;
    };
}

interface FetchBlogsFailureAction {
    type: typeof BLOG_ACTIONS.GET_ALL_BLOGS_FAILURE;
    payload: string;
}

// Union of all blog action types
export type BlogActionTypes =
    | FetchBlogsRequestAction
    | FetchBlogsSuccessAction
    | FetchBlogsFailureAction
    // Add other action types as needed
    ;

/**
 * Action creator for fetching all blogs
 * @param params - Query parameters for filtering blogs
 */
export const getAllBlogs = (params: BlogFilters = {}) => {
    return async (dispatch: Dispatch<BlogActionTypes>) => {
        dispatch({ type: BLOG_ACTIONS.GET_ALL_BLOGS_REQUEST });

        try {
            const response = await api({
                ...blogEndpoints.getAllBlogs,
                body: { params }
            });

            const blogData = response.data || response;
            const total = response.total || (blogData ? blogData.length : 0);
            console.log(blogData);

            dispatch({
                type: BLOG_ACTIONS.GET_ALL_BLOGS_SUCCESS,
                payload: blogData
            });

            return blogData;
        } catch (error: any) {
            dispatch({
                type: BLOG_ACTIONS.GET_ALL_BLOGS_FAILURE,
                payload: error.message || 'Failed to fetch blogs'
            });
            throw error;
        }
    };
};