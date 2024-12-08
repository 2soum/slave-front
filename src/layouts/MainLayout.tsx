import Header from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen ">
      {children}
    </div>
  );
};

export default MainLayout;