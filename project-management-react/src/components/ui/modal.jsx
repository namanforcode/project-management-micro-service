export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Edit Project</h3>
            <button onClick={onClose} className="text-xl">&times;</button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  