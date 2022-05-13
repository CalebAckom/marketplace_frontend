import React from "react";
import FeedIcon from '@mui/icons-material/Feed';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LayersIcon from '@mui/icons-material/Layers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import RecommendIcon from '@mui/icons-material/Recommend';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Dashboard = () => {
  return (
    <>
      <div id="sidebarMenu" class="col d-md-block bg-light sidebar collapse">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active text-white" aria-current="page" href="#">
              <span data-feather="home"></span>
              Stats board
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file"></span>
              <FeedIcon/>Orders
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              <LocalGroceryStoreIcon/>Products
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="users"></span>
              <GroupIcon/>Customers
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="bar-chart-2"></span>
              <LeaderboardIcon/>Reports
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="layers"></span>
              <LayersIcon/>Integrations
            </a>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <AccessTimeIcon/>Current month
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <AvTimerIcon/>Last quarter
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <RecommendIcon/>Social engagement
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <ReceiptIcon/>Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
