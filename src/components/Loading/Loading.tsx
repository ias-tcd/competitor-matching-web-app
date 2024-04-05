import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
    return (
        <div className='wrapper'>
            <ClipLoader className='Loadings' color='green' size='40' />
            <p>Loading...</p>
        </div>
    );
};
export default Loading;
