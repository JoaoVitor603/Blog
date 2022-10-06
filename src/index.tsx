import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import ToastContainerProps from './utils/toastContainerProps';
import './theme/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <ToastContainer {...ToastContainerProps} />
    <App />
  </>
);
