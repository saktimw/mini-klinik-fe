export interface AuthState {
   loading: boolean;
}

export interface AuthActions {
   setLoading: (loading: boolean) => void;
}