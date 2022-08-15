import { gql } from '@apollo/client';

export const PAGINATORINFO = gql`
fragment PaginatorParts on PaginatorInfo {
  count
  currentPage
  firstItem
  hasMorePages
  lastItem
  lastPage
  perPage
  total
}
`;