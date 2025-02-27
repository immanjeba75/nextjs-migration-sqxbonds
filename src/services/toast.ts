interface ToastProps {
    type: 'success' | 'error' | 'warning' | 'info' | 'danger';
    message: string;
    title?: string;
  }
  
  export const Toast = ({ type, message, title }: ToastProps): void => {
    // You can integrate with a toast library like react-toastify
    console.log(`${type}: ${title || ''} - ${message}`);
    // Example: toast[type](message, { title });
  };