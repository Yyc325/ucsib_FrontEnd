import {defineStore} from "pinia";
import {createLocalStorage} from "@/utils/storage";
import store from "@/store";

interface ArticleStore {
    currentArticle:any
}
const ls = createLocalStorage()
export const articleStore = defineStore('article-store',{
    state: (): ArticleStore => ({
        currentArticle:null
    }),
    getters: {
        getCurrentArticle():any{
            return ls.get('CURRENT_ARTICLE') || this.currentArticle
        }
    },
    actions: {
        setCurrentArticle(article: any):void{
            this.currentArticle = article
        }
    },
})
export function useArticleStoreWithOut() {
    return articleStore(store);
}