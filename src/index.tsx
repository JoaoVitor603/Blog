import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import ToastContainerProps from './utils/toastContainerProps';
import './theme/main.scss';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <>
    <ToastContainer {...ToastContainerProps} />
    / <App />
  </>
);
