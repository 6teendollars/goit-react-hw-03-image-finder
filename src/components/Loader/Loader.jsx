import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.backdropLoader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={css.loader}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
