import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const StorageContext = createContext({});

export const useStorage = () => useContext(StorageContext);

export const upload = ({ bucket_name, file, path }) => supabase.storage.from(bucket_name).upload(path, file, {
    cacheControl: '3600',
    upsert: false
})

export const remove = ({ bucket_name, path }) => supabase.storage.from(bucket_name).remove([path])

export const storage = (bucket_name) => supabase.storage.from(bucket_name)

const StorageProvider = ({ children }) => {
    return (
        <StorageContext.Provider value={{ upload, remove, storage }}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;