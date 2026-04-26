import create from "zustand";

export const useStore = create((set) => ({
  files: [],
  activeFile: null,
  setFiles: (files) => set({ files }),
  setActiveFile: (file) => set({ activeFile: file })
}));
