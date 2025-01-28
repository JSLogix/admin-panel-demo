export interface TypePagination {
  page: number;
  per_page: number;
  offset?: number;
  total_entries_size?: number;
  current_entries_size?: number;
  total_pages?: number;
}

interface StateList<L, P> {
  pagination?: TypePagination;
  data: L[];
  params: P;
  loading: boolean;
}
interface StateDetail<D> {
  data?: D;
  loading: boolean;
  active?: any;
}
export interface State<L, P, D> {
  list: StateList<L, P>;
  detail: StateDetail<D>;
}
