import { create } from "zustand";
import type { GuestbookMessage } from "../lib/guestbook";

type GuestbookState = {
  isDialogOpen: boolean;
  messages: GuestbookMessage[];
  openDialog: () => void;
  closeDialog: () => void;
  setMessages: (messages: GuestbookMessage[]) => void;
  addMessage: (message: GuestbookMessage) => void;
};

export const useGuestbookStore = create<GuestbookState>((set) => ({
  isDialogOpen: false,
  messages: [],
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [message, ...state.messages] })),
}));
