const Alert = ({ message, type = 'error' }) => {
  const styles = type === 'success' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900';

  return (
    <div className={'px-4 py-3 rounded-xl text-sm ' + styles}>
      {message}
    </div>
  );
};

export default Alert;
