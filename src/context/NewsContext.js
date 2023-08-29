import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const NewsContext = createContext({});

export const useNews = () => useContext(NewsContext);

export const store = ({ title, content, is_show, image, tags, category_id, image_public_url }) => supabase.from('news').insert([{ title: title, content: content, is_show: is_show, image: image, tags: tags, category_id: category_id, image_public_url: image_public_url }])

export const update = ({ id, title, content, is_show, image, tags, category_id, image_public_url }) => supabase.from('news').update([{ title: title, content: content, is_show: is_show, image: image, tags: tags, category_id: category_id, image_public_url: image_public_url }]).eq('id', id)

export const show = () => supabase.from('news').select('*').order('created_at', { ascending: false })

export const destroy = (id) => supabase.from('news').delete().eq('id', id)

export const showByTag = (tag) => supabase.from('news').select('*, categories(*)').order('created_at', { ascending: false }).like('tags', `%${tag}%`)

export const showLike = (column, like) => supabase.from('news').select('*, categories(*)').order('created_at', { ascending: false }).like(column, like).range(0, 10)

export const selectSingleById = (id) => supabase.from('news').select(`*, categories(*)`).eq('id', id).single()

const NewsProvider = ({ children }) => {
    return (
        <NewsContext.Provider value={{ store, update, show, destroy, selectSingleById, showLike, showByTag }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;