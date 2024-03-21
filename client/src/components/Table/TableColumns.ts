const columns = [
  {
    title: 'Store',
    dataIndex: 'storeID',
    key: 'storeID',
  },
  {
    title: 'Savings',
    dataIndex: 'savings',
    key: 'savings',
    render: (savings: number) => `${parseFloat(savings.toString()).toFixed(2)}%`,
  },
  {
    title: 'Price',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: (salePrice: number) => `$${salePrice}`,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Deal Rating',
    dataIndex: 'dealRating',
    key: 'dealRating',
  },
  {
    title: 'Release',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
    render: (releaseDate: number) => new Date(releaseDate * 1000).toLocaleDateString(),
  },
  {
    title: 'Reviews',
    dataIndex: 'steamRatingText',
    key: 'reviews',
  },
  {
    title: 'Recent',
    dataIndex: 'lastChange',
    key: 'lastChange',
    render: (lastChange: number) => new Date(lastChange * 1000).toLocaleDateString(),
  },
];

export { columns };


