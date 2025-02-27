import { BLOG_ACTIONS } from '../actionType/blog';
import { BlogsState, Blog } from '../../types/blog';
import { BlogActionTypes } from '../actions/blog';

const intialState = {
  blogPostCreatData: {},
  blogPostCreateLoader: false,
  blogPostList: {},
  isBlogPostListLoader: false,
  blogUpdate: {},
  isBlogUpdate: false,
  blogDelete: {},
  isBlogDeleteLoad: false,

};

export const blogReducer = (
  state = intialState,
  { type, payload }: any
) => {
  switch (type) {
    case BLOG_ACTIONS.GET_ALL_BLOGS_REQUEST:
      return { ...state, isBlogPostListLoader: true };
    case BLOG_ACTIONS.GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        blogPostList: payload,
        isBlogPostListLoader: false,
      };
    case BLOG_ACTIONS.GET_ALL_BLOGS_FAILURE:
      return {
        ...state,
        blogPostList: payload,
        isBlogPostListLoader: false,
      };


    default:
      return state;
  }
};