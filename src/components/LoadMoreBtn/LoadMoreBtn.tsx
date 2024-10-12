
type loadMoreProps = {
  loadMore: () => void;
}
const LoadMoreBtn:loadMoreProps = ({
  loadMore
}) => {
  return (
    <button onClick={loadMore} type='button'> Load more</button>
  )
}

export default LoadMoreBtn