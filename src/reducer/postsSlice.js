import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setInitialPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            const newPost = {
                id: nanoid(),
                userId: action.payload.userId,
                title: action.payload.title,
                body: action.payload.body,
                image:
                    action.payload.image ||
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            };
            state.posts.push(newPost);
        },
        editPost: (state, action) => {
            const { id, title, body, image } = action.payload;
            const post = state.posts.find((p) => p.id === id);
            if (post) {
                post.title = title;
                post.body = body;
                post.image = image;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((p) => p.id !== action.payload);
        },
    },
});

export const { setInitialPosts, addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
