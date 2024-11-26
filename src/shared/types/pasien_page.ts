import { Pasien } from '~/shared/types/pasien';

export interface BaseFilter {
   page: number,
   perPage: number,
   total: number,
   lastPage: number,
   keyword: string
}

export interface PasienState {
   pasien_all: Pasien[];
   pasien_id: Pasien | undefined;
   all_loading: boolean;
   save_loading: boolean;
   all_filter: BaseFilter
   id: number;
   form_action: 'save' | 'update';
}

export interface PasienActions {
   setFilterAll: (data: Object) => void;
   setPasienAll: (data: any) => void;
   setID: (id: number) => void;
   setPasienID: (data: any) => void;
   setFormAction: (act: 'save' | 'update') => void;
   setLoading: (loading: boolean) => void;
   setSaveLoading: (loading: boolean) => void;
   resetFilter: () => void;
}