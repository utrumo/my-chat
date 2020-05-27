import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends PureComponent {
  constructor(props) {
    super(props);
    this.modalRoot = document.querySelector('#portal-root');
    this.el = document.createElement('div');
    this.state = {
      isAppended: false,
    };
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
    this.setState({ isAppended: true });
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    const { isAppended } = this.state;
    return isAppended && ReactDOM.createPortal(children, this.el);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
