import Spinner from 'react-bootstrap/Spinner'

const LoadingBox = () => {
  return (
    <Spinner animation='border' role='status'>
        <span className='visual-hidden'>Loading...</span>
    </Spinner>
  )
}

export default LoadingBox