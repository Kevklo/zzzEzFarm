import { FaSpinner } from 'react-icons/fa';
import { NavBar } from './NavBar';

export const LoadingPage = () => {
  return (
    <>
      <NavBar/>
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </>
  );
};