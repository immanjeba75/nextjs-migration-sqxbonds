'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as blogAction from '../../redux/actions/blog';
import { BlogFilters, Blog } from '../../types/blog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
function BlogPage({ getAllBlogs, blogPostList }: { getAllBlogs: (filters: BlogFilters) => void; blogPostList: { blogs: Blog[] } }) {
    
    // const { blogPostList } = useAppSelector(state => state.blog)
    const blogs = blogPostList?.blogs || [];
    const [filters, setFilters] = useState<BlogFilters>({
        page: 1,
        perPage: 10,
        blog_title: '',
        blog_description: ''
    });
    console.log(blogs);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            getAllBlogs(filters)
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleSearch = () => {
        fetchBlogs();
    };

    const handlePageChange = (newPage: number) => {
        setFilters({
            ...filters,
            page: newPage
        });
        fetchBlogs();
    };

    //   const handleDelete = async (id: string | number) => {
    //     if (window.confirm('Are you sure you want to delete this blog?')) {
    //       try {
    //         await dispatch<any>(deleteBlog(id));
    //       } catch (error) {
    //         console.error('Error deleting blog:', error);
    //       }
    //     }
    //   };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleReset = () => {
        setFilters({
            page: 1,
            perPage: 10,
            title: '',
            description: ''
        });
        fetchBlogs();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Blog Management</h1>

            {/* Search Form */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Blog Title</label>
                        <input
                            type="text"
                            name="title"
                            value={filters.blog_title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Search by title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={filters.blog_description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Search by description"
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Blog List */}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Description</th>
                            <th className="p-3 border">Created At</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs && blogs.length > 0 ? (
                            blogs.map((blog: Blog) => (
                                <tr key={blog.blog_id}>
                                    <td className="p-3 border">{blog.blog_title}</td>
                                    <td className="p-3 border">{blog.blog_description}</td>
                                    <td className="p-3 border">
                                        {new Date(blog.created_date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                                                Edit
                                            </button>
                                            {/* <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-3 text-center">
                                    No blogs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div>
                    <select
                        value={filters.perPage}
                        onChange={(e) => setFilters({ ...filters, perPage: Number(e.target.value) })}
                        className="p-2 border rounded"
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        disabled={filters.page === 1}
                        onClick={() => handlePageChange(filters.page ? filters.page - 1 : 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="flex items-center px-3">Page {filters.page}</span>
                    <button
                        onClick={() => handlePageChange(filters.page ? filters.page + 1 : 2)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}


const mapStatesToProps = ({ blog: { blogPostList = {} } }: any) => {
    return { blogPostList };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            ...blogAction,
        },
        dispatch
    );

export default connect(
    mapStatesToProps,
    mapDispatchToProps
)(BlogPage);