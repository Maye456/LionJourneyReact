import {
    CREATE_POST,
    RETRIEVE_POST,
    UPDATE_POST,
    DELETE_POST
} from './types';
import PostDataService from '../services/post.service';

export const createPost = (title, content) => async (dispatch) => {
    try {
        const res = await PostDataService.create({ title, content });

        dispatch({
            type: CREATE_POST,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const retrievePosts = () => async (dispatch) => {
    try {
        const res = await PostDataService.getAll();

        dispatch({
            type: RETRIEVE_POST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const updatePost = (id, data) => async (dispatch) => {
    try {
        const res = await PostDataService.update(id, data);

        dispatch({
            type: UPDATE_POST,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await PostDataService.delete(id);

        dispatch({
            type: DELETE_POST,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
}

export const findPostByTitle = (title) => async (dispatch) => {
    try {
        const res = await PostDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_POST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}