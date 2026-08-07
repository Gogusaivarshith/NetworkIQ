import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;