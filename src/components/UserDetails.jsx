import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPosts, addPost, editPost, deletePost } from "../reducer/postsSlice";
import { FiArrowLeft, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { AiFillMail, AiFillPhone } from "react-icons/ai";
import { FaGlobeAsia } from "react-icons/fa";
import PostModal from "./PostsModals";
import { toast } from 'react-toastify';


const POSTS_PER_PAGE = 3;

const UserDetails = ({ user, posts, onBack }) => {
    const dispatch = useDispatch();
    const { posts: allPosts } = useSelector((state) => state.posts);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        console.log(posts)
        dispatch(setInitialPosts(posts));
    }, [dispatch, posts]);

    const filteredPosts = allPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleAddPost = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (post) => {
        console.log(post);

        setEditData(post);
        setIsModalOpen(true);
    };

    const handleSave = (data) => {
        if (data.id) {
            dispatch(editPost(data));
        } else {
            dispatch(addPost({ ...data, userId: user.id }));
        }
    };

    const handleDelete = (id) => {
        dispatch(deletePost(id));
        toast.success("Post deleted!")
        const remainingPosts = filteredPosts.length - 1;
        const newTotalPages = Math.ceil(remainingPosts / POSTS_PER_PAGE);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-10">
            <button
                onClick={onBack}
                className="flex items-center text-blue-700 hover:text-blue-900 font-medium mb-6"
            >
                <FiArrowLeft className="mr-2" /> Back to Users
            </button>

            <div className="bg-white shadow-md rounded-2xl flex justify-between items-center p-6 mb-10 border border-gray-100">
                <div className="flex items-center gap-6">
                    <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{user.name}</h2>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 text-sm">
                            <div className="flex items-center gap-2">
                                <AiFillMail className="text-blue-600 text-lg" />
                                <span className="hover:text-blue-500">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AiFillPhone className="text-blue-600 text-lg" />
                                <span className="hover:text-blue-500">{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaGlobeAsia className="text-blue-600 text-lg" />
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                                >
                                    {user.website}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 text-md font-medium">@{user.username}</p>
            </div>

            <div className="flex items-center justify-between mb-8">
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-[92%] px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <button
                    onClick={handleAddPost}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition-all"
                >
                    <FiPlus className="text-lg" /> Add Post
                </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="h-[25rem] bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all relative"
                        >
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-5 flex flex-col justify-between h-[calc(25rem-12rem)]">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{post.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                        {post.body}
                                    </p>
                                </div>

                                <div className="flex justify-end items-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        title="Edit"
                                    >
                                        <FiEdit className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Delete"
                                    >
                                        <FiTrash2 className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No Posts found.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-end mt-10">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-blue-50 border-blue-300 text-blue-600"
                                }`}
                        >
                            &lt;
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${currentPage === index + 1
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white hover:bg-blue-50 border-blue-300 text-blue-600"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-blue-50 border-blue-300 text-blue-600"
                                }`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}

            <PostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editData}
            />
        </div>
    );
};

export default UserDetails;
