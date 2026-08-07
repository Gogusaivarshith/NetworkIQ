import {
  FaChartLine,
  FaBoxOpen,
  FaRobot,
  FaHome,
  FaChartBar,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="logo">NetworkIQ</h2>

      <ul>

        <li>
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li>
          <FaChartBar />
          <span>Sales</span>
        </li>

        <li>
          <FaBoxOpen />
          <span>Inventory</span>
        </li>

        <li>
          <FaChartLine />
          <span>Forecast</span>
        </li>

        <li>
          <FaRobot />
          <span>AI Insights</span>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;