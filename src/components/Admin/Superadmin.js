import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  useHistory,
} from "react-router-dom";
import "../../assets/css/admin.css";
import AuthContext from "../../../src/Context/AuthContext";
import { LOCALHOST_AUTH_TOKENS } from "../../../src/utils/config";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 
import { PreselectedValues } from "../../../src/utils/PreselectedData";
import ProfilePageService from "../../../src/services/ProfileService";
import Pagination from "../../../src/components/Pagination/Pagination";
import Activatedbusinesslist from "./ActivatedBusinessList";
import Deactivatedbusinesslist from "./DeactivatedBusinessList";
import Activatedindividual from "./ActivatedIndividual";
import Deactivatedindividual from "./DeactivatedIndividual";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Allorderlist from "./Allorderlist";

const Accordion = withStyles({
  root: {
    color:"#fff",
    backgroundColor:"#11468F",
    boxShadow: "none",
    borderRadius: "0",
    width: "100%",
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: '#21CFFF',
    // borderBottom: '1px solid #CAF0F8',
    marginBottom: -1,
    color: "#fff",
    borderRadius: "0",
    // minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
      color:"yellow"
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor:"white",
    color:"#000"
  },
}))(MuiAccordionDetails);

function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: "100%", marginTop: "5px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<span class="text-white"><ExpandMoreIcon /></span>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: "text.white", fontSize:"12px" }}>
            BUSINESS USERS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <NavLink
              style={{ textDecoration: "none", backgroundColor:"#fff" }}
              class="text-primary"
              to="/amali-tech-adminpage/business-activated/"
            >
              Activated list
            </NavLink>{" "}
            <br />
            <NavLink
              style={{ textDecoration: "none", backgroundColor:"#fff"}}
              class="text-primary"
              to="/amali-tech-adminpage/business-deactivated/"
            >
              De-activated list
            </NavLink>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<span class="text-white"><ExpandMoreIcon /></span>}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography> */}
          <Typography sx={{ color: "text.white", fontSize:"12px" }}>
            INDIVIDUAL USERS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {" "}
            <NavLink
              style={{ textDecoration: "none", backgroundColor:"#fff"}}
              class="text-primary"
              to="/amali-tech-adminpage/activated-user/"
            >
              Activated list
            </NavLink>{" "}
            <br />
            <NavLink
              style={{ textDecoration: "none", backgroundColor:"#fff"}}
              class="text-primary"
              to="/amali-tech-adminpage/deactivated-user/"
            >
              De-activated list
            </NavLink>
          </Typography>
        </AccordionDetails>
      </Accordion>
       <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<span class="text-white"><ExpandMoreIcon /></span>}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ color: "text.white", fontSize:"12px" }}>
            ORDERS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.black" }}>
          <NavLink
              style={{ textDecoration: "none", backgroundColor:"#fff"}}
              class="text-primary"
              to="/amali-tech-adminpage/all-orders"
            >
              All Orders
            </NavLink>
          </Typography>
        </AccordionDetails>
      </Accordion> 
      {/* <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary 
          expandIcon={<span class="text-white"><ExpandMoreIcon /></span>}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ color: "text.white", fontSize:"12px" }}>
            PERSONAL DATA
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.dark" }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}

function Superadmin({setIsLog}) {
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };
  


  useEffect(() => {
    window.scroll(0, 0);
    setIsLog(true);
      setOpen(true);
    setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, []);

  const style = {
    control: (base) => ({
      ...base,
      cursor: "pointer",
      // This line disable the blue border
      boxShadow: "none",
      backgroundColor: "#420ec0",
      border: "none",
      color: "#ffffff",
    }),
  };

  return (
    <>
       <>
          <Snackbar
            anchorOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            open={open}
            autoHideDuration={6000}
            message={`Welcome Admin, Have fun Working!`}
            onClose={handleToClose}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleToClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </>
      {!isReady ? (
        <div class="d-flex justify-content-center" style={{ height: "100vh" }}>
          <span
            className="spinner-border"
            style={{
              width: "100px",
              height: "100px",
              marginTop: "100px",
              color: "#11468F",
            }}
          ></span>
          <div class="position-absolute top-50 start-50 translate-middle">
            LOADING ADMIN PORTAL, PLEASE WAIT!!...
          </div>
        </div>
      ) : (
        <div class="adminWrapper">
          <div
            class="d-flex justify-content-center container mt-1"
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#ffffff",
            }}
          >
            <div class="row dashboardWrapper">
              <div class="d-flex flex-wrap align-items-center justify-content-center mt-2">
                <ul
                  class="nav col-md-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
                  style={{ fontFamily: "Roboto,sans-serif" }}
                >
                  <li>
                    <a href="#" class="nav-link px-2 link-secondary">
                      Admin Portal
                    </a>
                  </li>
                  <li>
                    <a href="#" class="nav-link px-2 link-dark">
                      Overview
                    </a>
                  </li>
                </ul>

                <div class="fw-bold text-end">Hi! Admin</div>
              </div>

              <div
                class="col-md-2"
                style={{
                  height: "100vh",
                  border: "1px solid #EFEFEF",
                  backgroundColor: "#11468F",
                }}
              >
                <ControlledAccordions />
              </div>
              <div
                class="col-md-8 d-flex flex-row flex-wrap bg-white m-1"
                style={{ border: "1px solid #EFEFEF" }}
              >
                <div class="row" style={{ height: "10px" }}>
                  <div
                    class="d-flex flex-row flex-wrap w-100 p-2 mb-2"
                    style={{ backgroundColor: "#e0e0e0" }}
                  >
                    <div class="col-md-3 mt-1">
                      <div class="card m-1">
                        <div class="card-body">
                          <h5 class="card-title"><AddModeratorIcon/> Add Admin</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 mt-1">
                      <div class="card m-1">
                        <div class="card-body">
                          <h5 class="card-title"><CallToActionIcon/> Action one</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 mt-1">
                      <div class="card m-1">
                        <div class="card-body">
                          <h5 class="card-title"><CalculateIcon/> Calculate</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 mt-1">
                      <div class="card m-1">
                        <div class="card-body">
                          <h5 class="card-title"><SettingsIcon/> Settings</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Switch Display all the views here */}
                  <Switch>
                    <Route
                      path="/amali-tech-adminpage/business-activated/"
                      exact
                      component={Activatedbusinesslist}
                    />
                      <Route
                      path="/amali-tech-adminpage/business-activated/:search"
                      exact
                      component={Activatedbusinesslist}
                    />
                    <Route
                      path="/amali-tech-adminpage/business-deactivated/"
                      exact
                      component={Deactivatedbusinesslist}
                    />
                    <Route
                      path="/amali-tech-adminpage/activated-user/"
                      exact
                      component={Activatedindividual}
                    />
                    <Route
                      path="/amali-tech-adminpage/deactivated-user/"
                      exact
                      component={Deactivatedindividual}
                    />
                      <Route
                      path="/amali-tech-adminpage/all-orders"
                      exact
                      component={Allorderlist}
                    />
                  </Switch>
                </div>
              </div>
              <div
                class="col-auto bg-white fw-bold"
                style={{ border: "1px solid #EFEFEF" }}
              >
                <Dashboard />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Superadmin;
