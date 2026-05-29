import {HistoryRecord, useSearchHistoryStoreWithOut} from "@/store/modules/search_history";
import {computed} from "vue";


export const useSearchHistory = () => {
    const searchHistoryStore = useSearchHistoryStoreWithOut()

    const getHistory = computed(() => searchHistoryStore.history)

    const pushHistory = (history: HistoryRecord): void => {
        searchHistoryStore.pushHistory(history)
    }

    const deleteHistory = (ids: string[]): void => {
        searchHistoryStore.deleteHistory(ids)
    }

    const clearHistory = (): void => {
        searchHistoryStore.clearHistory()
    }

    return {
        getHistory,
        pushHistory,
        deleteHistory,
        clearHistory
    }
}