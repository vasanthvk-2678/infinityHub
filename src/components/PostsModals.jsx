import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

//common for both edit and add post
const PostModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title || "");
                setBody(initialData.body || "");
                setImage(initialData.image || "");
            } else {
                setTitle("");
                setBody("");
                setImage("");
            }
        }
    }, [isOpen, initialData]);


    if (!isOpen) return null;

    const handleSubmit = () => {
        onSave({
            id: initialData?.id,
            title,
            body,
            image: image || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", //if user not added the images, show placeholder image
        });
        if (initialData?.id) {
            toast.success("Changes saved successfully!")
        } else {
            toast.success("Post uploaded successfully!")
        }
        setTimeout(() => {
            toast.dismiss();
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[28rem] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Edit Post" : "Add New Post"}
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <textarea
                        placeholder="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="4"
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
