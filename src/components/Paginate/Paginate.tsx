import ReactPaginate from 'react-paginate';
import style from './Paginate.module.css';

interface PaginateProps {
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
  forcePage: number;
}

export default function Paginate({ pageCount, onPageChange, forcePage }: PaginateProps) {
  return (
    <ReactPaginate
      className={style.pagination}
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      forcePage={forcePage}
      activeClassName={style.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};