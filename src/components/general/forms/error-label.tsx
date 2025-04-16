interface ErrorLabelProps {
  error: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ error }) => {
  return <p className="text-red-500">{error}</p>;
};

export default ErrorLabel;