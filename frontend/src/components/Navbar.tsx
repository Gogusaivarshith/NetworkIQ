import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">

      <div>
        <h2>AI Supply Chain Intelligence</h2>
        <p>Real-time Analytics & Inventory Optimization</p>
      </div>

      <div className="profile">
        <span>🔔</span>
        <span>⚙️</span>
        <div className="avatar">NV</div>
      </div>

    </div>
  );
};

export default Navbar;