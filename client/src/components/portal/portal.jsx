import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, className = 'root-portal' }) => {
  const rootRef = useRef(document.createElement('div'));
  const [isAppended, setIsAppended] = useState(false);
  useEffect(() => {
    rootRef.current.classList.add(className);
    document.body.appendChild(rootRef.current);
    setIsAppended(true);
    return () => {
      document.body.removeChild(rootRef.current);
    };
  }, []);
  return isAppended && ReactDOM.createPortal(children, rootRef.current);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  el: PropTypes.string,
};

export default Portal;
