import { ref, readonly, provide, inject, computed, type App } from "vue";
import {
  readLocalStorage,
  writeLocalStorage,
} from "@/utils/localStorageWrapper";

const SETLIST_KEY = "jrb_setlist";

export function setupSetlistGlobal(app: App) {
  const setlistIds = ref<Set<string>>(new Set());

  const init = () => {
    const saved = readLocalStorage(SETLIST_KEY);
    if (Array.isArray(saved)) {
      setlistIds.value = new Set(saved);
    } else if (typeof saved === "object" && Object.keys(saved).length === 0) {
      setlistIds.value = new Set();
    }
  };

  init();

  const toggleSong = (title: string, edition: number, page_num: number) => {
    const id = `${title}|${edition}|${page_num}`;
    const newSet = new Set(setlistIds.value);

    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    // Trigger reactivity by replacing the reference
    setlistIds.value = newSet;

    // Persist as array
    writeLocalStorage(SETLIST_KEY, Array.from(newSet));
  };

  const isInSetlist = (title: string, edition: number, page_num: number) => {
    return setlistIds.value.has(`${title}|${edition}|${page_num}`);
  };

  const context = {
    setlistIds: readonly(setlistIds),
    count: computed(() => setlistIds.value.size),
    toggleSong: toggleSong,
    isInSetlist: isInSetlist,
  };

  app.provide("setlist", context);
}

export function useSetlist() {
  const context = inject<{
    setlistIds: any;
    count: any;
    toggleSong: (t: string, e: number, pn: string) => void;
    isInSetlist: (t: string, e: number) => boolean;
  }>("setlist");

  if (!context) {
    throw new Error(
      "useSetlist must be used within setupSetlist (usually in App.vue)",
    );
  }
  return context;
}
