const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 60;

const getPagination = (query) => {
  const pageNumber = Math.max(Math.abs(parseInt(query.pageNumber, 10)) || DEFAULT_PAGE_NUMBER, 0);
  const pageSize = Math.min(Math.abs(parseInt(query.pageSize, 10)) || DEFAULT_PAGE_SIZE, 60);

  return {
    pageNumber,
    pageSize,
  };
};

export { getPagination };
