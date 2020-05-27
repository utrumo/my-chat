import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container] = useState(document.createElement(el));
  const [isAppended, setIsAppended] = useState(false);
  useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);
    setIsAppended(true);
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  return isAppended && ReactDOM.createPortal(children, container);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  el: PropTypes.string,
};

export default Portal;
