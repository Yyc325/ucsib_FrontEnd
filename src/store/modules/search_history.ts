import {defineStore} from "pinia";
import {createLocalStorage} from "@/utils/storage";

import store from "@/store";

enum SEARCH_HISTORY {
    LIMIT = 10,
    STACK_NAME = 'web-search-history'
}

export interface HistoryRecord {
    id: string
    content: string
    createTime: Date
}

interface HistoryStore {
    history: HistoryRecord[]
}

const ls = createLocalStorage();

export const useSearchHistoryStore = defineStore("search-history-store", {
    state: (): HistoryStore => ({
        history: ls.get(SEARCH_HISTORY.STACK_NAME) || []
    }),
    actions: {
        // 推入历史记录
        pushHistory(record: HistoryRecord) {
            const len = this.history.length
            if (len >= SEARCH_HISTORY.LIMIT) {
                this.history.pop()
            }
            this.history.unshift(record)
            ls.set(SEARCH_HISTORY.STACK_NAME, this.history)
        },
        // 删除单个历史记录
        deleteHistory(ids: string[]) {
            for (let id of ids) {
                const deleteIndex = this.history.findIndex(vm => vm.id === id)
                this.history.splice(deleteIndex, 1)
            }
            ls.set(SEARCH_HISTORY.STACK_NAME, this.history)
        },
        // 清空历史记录
        clearHistory() {
            this.history = []
            ls.set(SEARCH_HISTORY.STACK_NAME, this.history)
        }
    },
});

export function useSearchHistoryStoreWithOut() {
    return useSearchHistoryStore(store);
}
