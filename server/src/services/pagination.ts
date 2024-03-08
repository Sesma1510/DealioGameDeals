const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

const getPagination = (query) => {
  const page = Math.max(Math.abs(query.page) || DEFAULT_PAGE_NUMBER, 1);
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

export { getPagination };
