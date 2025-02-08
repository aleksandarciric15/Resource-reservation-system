type LoadingSpinnerProps = {
  loading: boolean;
  message?: string;
};

export const LoadingSpinner = ({ loading, message }: LoadingSpinnerProps) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 border-t-transparent"></div>
        {message && (
          <p className=" text-white text-lg font-semibold animate-fadeIn">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
