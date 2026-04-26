import { create } from "zustand";
export const useStore = create((set, get) => ({
  // 📁 FILE SYSTEM
  files: [],
  setFiles: (files) => set({ files }),

  // 📄 EDITOR TABS
  tabs: [],
  activeTab: null,

  openTab: (file, content) => {
    const { tabs } = get();

    const exists = tabs.find(t => t.path === file.path);
    if (exists) {
      set({ activeTab: file.path });
      return;
    }

    const newTab = {
      ...file,
      content,
      isDirty: false
    };

    set({
      tabs: [...tabs, newTab],
      activeTab: file.path
    });
  },

  closeTab: (path) => {
    const { tabs, activeTab } = get();

    const newTabs = tabs.filter(t => t.path !== path);

    set({
      tabs: newTabs,
      activeTab: activeTab === path
        ? newTabs[0]?.path || null
        : activeTab
    });
  },

  setActiveTab: (path) => set({ activeTab: path }),

  // ✏️ CODE EDITING
  updateCode: (value) => {
    const { tabs, activeTab } = get();

    const updated = tabs.map(t =>
      t.path === activeTab
        ? { ...t, content: value, isDirty: true }
        : t
    );

    set({ tabs: updated });
  },

  markSaved: () => {
    const { tabs, activeTab } = get();

    const updated = tabs.map(t =>
      t.path === activeTab
        ? { ...t, isDirty: false }
        : t
    );

    set({ tabs: updated });
  },

  // 🖥️ TERMINAL SYSTEM
  terminals: [],
  activeTerminal: null,

  addTerminal: (term) => {
    const { terminals } = get();

    set({
      terminals: [...terminals, term],
      activeTerminal: term.id
    });
  },

  setActiveTerminal: (id) => set({ activeTerminal: id }),

  removeTerminal: (id) => {
    const { terminals, activeTerminal } = get();

    const newTerms = terminals.filter(t => t.id !== id);

    set({
      terminals: newTerms,
      activeTerminal: activeTerminal === id
        ? newTerms[0]?.id || null
        : activeTerminal
    });
  },

  // 🤖 AI STATE (for next phase)
  aiOutput: "",
  setAIOutput: (output) => set({ aiOutput: output })
}));
