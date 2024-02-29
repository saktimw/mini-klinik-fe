import { create } from "zustand";
import { AuthActions, AuthState } from "~/shared/types/auth_page";

const initialState: AuthState = {
   loading: false
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
   ...initialState,
   setLoading: (l) => set({ loading: l })   
}))