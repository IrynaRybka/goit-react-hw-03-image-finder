import { ColorRing } from 'react-loader-spinner';
export default function Loader() {
    return (
        <div role="alert">
            <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#d5def5', ' #8594e4', '#6643b5', '#430f58', '#240747']}
/>
        </div>
    )
}