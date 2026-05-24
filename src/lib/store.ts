import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Status = "todo" | "doing" | "done";

export interface JournalEntry {
  id: string;
  date: string; // ISO
  title: string;
  body: string;
  tag?: string;
}

interface CareerState {
  checks: Record<string, boolean>;
  notes: Record<string, string>; // keyed notes (per module/milestone)
  statuses: Record<string, Status>;
  journal: JournalEntry[];
  streak: { lastDate: string | null; count: number };

  toggleCheck: (id: string) => void;
  setNote: (id: string, value: string) => void;
  setStatus: (id: string, status: Status) => void;
  addJournal: (entry: Omit<JournalEntry, "id" | "date"> & { date?: string }) => void;
  deleteJournal: (id: string) => void;
  pingStreak: () => void;
  resetAll: () => void;
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      checks: {},
      notes: {},
      statuses: {},
      journal: [],
      streak: { lastDate: null, count: 0 },

      toggleCheck: (id) =>
        set((s) => ({ checks: { ...s.checks, [id]: !s.checks[id] } })),
      setNote: (id, value) =>
        set((s) => ({ notes: { ...s.notes, [id]: value } })),
      setStatus: (id, status) =>
        set((s) => ({ statuses: { ...s.statuses, [id]: status } })),
      addJournal: (entry) =>
        set((s) => ({
          journal: [
            {
              id: crypto.randomUUID(),
              date: entry.date ?? new Date().toISOString(),
              title: entry.title,
              body: entry.body,
              tag: entry.tag,
            },
            ...s.journal,
          ],
        })),
      deleteJournal: (id) =>
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),
      pingStreak: () =>
        set((s) => {
          const today = new Date().toISOString().slice(0, 10);
          if (s.streak.lastDate === today) return s;
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          const cont = s.streak.lastDate === yesterday;
          return {
            streak: { lastDate: today, count: cont ? s.streak.count + 1 : 1 },
          };
        }),
      resetAll: () =>
        set({
          checks: {},
          notes: {},
          statuses: {},
          journal: [],
          streak: { lastDate: null, count: 0 },
        }),
    }),
    {
      name: "career-os-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

export function useChecksProgress(ids: string[]) {
  const checks = useCareerStore((s) => s.checks);
  if (ids.length === 0) return { done: 0, total: 0, pct: 0 };
  const done = ids.filter((id) => checks[id]).length;
  return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) };
}
