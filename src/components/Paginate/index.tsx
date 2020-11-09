import React, { useMemo } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import { PaginateList } from './style';

interface PaginateProps {
  page: number;
  totalItems?: number;
  itemsPerPage?: number;
  handlePaginate(goTo: number): void;
}

const Paginate: React.FC<PaginateProps> = ({ page, totalItems, itemsPerPage, handlePaginate }) => {
  const totalPages = useMemo(() => {
    if (totalItems && itemsPerPage) {
      return Math.ceil(totalItems / itemsPerPage);
    }
    return 0;
  }, [totalItems, itemsPerPage])

  const numberedList = useMemo(() => {
    return Array.from(Array(totalPages).keys()).map(item => item + 1)
  }, [totalPages])

  const shortenedList = useMemo(() => {
    if (page - 3 < 0) {
      return numberedList.splice(0, 5)
    }
    else {
      return numberedList.splice(page - 3, 5)
    }
  }, [numberedList, page])

  return (
    <>
      <PaginateList className="paginate">
        {page !== 1 &&
          <li onClick={() => handlePaginate(1)}>
            <FaAngleDoubleLeft className="begin" />
          </li>
        }
        {shortenedList.map(item => (
          <li
            key={item}
            onClick={() => handlePaginate(item)}
            className={`${item === page ? 'selected' : ''}`}
          >{item}</li>
        ))}
        {page !== totalPages &&
          <li onClick={() => handlePaginate(totalPages)}>
            <FaAngleDoubleRight className="end" />
          </li>
        }
      </PaginateList>
    </>
  );
}

export default Paginate;
