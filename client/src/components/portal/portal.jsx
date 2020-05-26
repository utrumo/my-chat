import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends PureComponent {
  constructor(props) {
    super(props);
    this.modalRoot = document.querySelector('#portal-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
