import {useArticleStoreWithOut} from "@/store/modules/articleStore";
import {computed} from "vue";


export const useArticle = ()=>{
    const articleStore = useArticleStoreWithOut()

    const getCurrentArticle = computed(()=>articleStore.getCurrentArticle)

    const setCurrentArticle = (article:any):void=>{
        articleStore.setCurrentArticle(article)
    }

    return {
        getCurrentArticle,
        setCurrentArticle
    }
}