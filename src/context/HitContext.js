import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const HitContext = createContext({});

export const useCategory = () => useContext(HitContext);

export const showFrom = ({ ascending, column }) => supabase.from('hits').select('*, news(*, categories(*))').order(column, { ascending: ascending })

export const updateOrCreate = async (newsId) => await supabase
    .from('hits')
    .select('*')
    .eq('news_id', newsId)
    .then(({ data: hits }) => {
        if (hits.length > 0) {
            const hitId = hits[0].id
            const hitCount = hits[0].hit + 1
            supabase
                .from('hits')
                .update({ hit: hitCount })
                .eq('id', hitId)
                .then(() => console.info('hit updated'))
                .catch(error => console.error(error))
        } else {
            supabase
                .from('hits')
                .insert({ news_id: newsId, hit: 1 })
                .then(() => console.info('hit created'))
                .catch(error => console.error(error))
        }
    })
    .catch(error => {
        console.error(error)
    })

const HitProvider = ({ children }) => {
    return (
        <HitContext.Provider value={{ showFrom, updateOrCreate }}>
            {children}
        </HitContext.Provider>
    );
};

export default HitProvider;