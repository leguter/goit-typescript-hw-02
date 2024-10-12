
type loadMoreProps = {
  loadMore: () => void;
}
const LoadMoreBtn = ({
  loadMore
}:loadMoreProps) => {
  return (
    <button onClick={loadMore} type='button'> Load more</button>
  )
}

export default LoadMoreBtn