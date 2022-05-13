// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useContext } from "react";
// import "../../assets/css/custom.css";
// import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import AuthContext from "../../Context/AuthContext";
// import {Dropdown} from "react-bootstrap"

// const useStyles = makeStyles((theme) => ({
//   formResposive: {
//     [theme.breakpoints.down("sm")]: {
//       width: "90%",
//     },
//   },
// }));

// const Navbars = () => {
//   const { user, logoutUser } = useContext(AuthContext);
//   const classes = useStyles();
//   return (
//     <nav
//       class=" header-wrapper"
//       style={{
//         width: "100vw",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div className="nav-main" style={{ width: "100%" }}>
//         <div class="header-brand header-brand-img.main-logo header-container">
//           <div className="icon-container">
//             <Link to="/">
//               <img
//                 src="/images/Logo.png"
//                 alt="Logo"
//                 className="footerimg pushdown"
//                 style={{ width: "158px" }}
//               />
//             </Link>
//           </div>
//           <form
//             className={classes.formResposive}
//             class=" border rounded-3 "
//             style={{
//               borderRadius: "10px",
//               display: "flex",
//               // background: '#5555ff',
//             }}
//           >
//             <input
//               type="text"
//               className="form-control border-0 pe-4 searchBtn"
//               placeholder="Search for anything..."
//               aria-describedby="button-addon2"
//               style={{ borderRightRadius: "0px", borderLeftRadius: "5px" }}
//             />
//             <div className="divider">
//               <div></div>
//             </div>
//             <select
//               class="form-select border-0 btnCategory"
//               id="inputGroupSelect02 "
//               style={{ borderRadius: "0px", width: "65%" }}
//             >
//               <option selected>All Categories</option>
//               <option value="1">One</option>
//               <option value="2">Two</option>
//               <option value="3">Three</option>
//             </select>
//             <div className="divider">
//               <div></div>
//             </div>
//             <div class="location-parent">
//               <div class="input-group-append">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   fill="currentColor"
//                   class="bi bi-geo-alt text-muted"
//                   viewBox="0 0 16 16"
//                   placeHolder="Ghana"
//                 >
//                   <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
//                   <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                 </svg>
//                 <button class=" text-muted loc-btn">Ghana</button>

//                 <button
//                   class="loc-btn-act"
//                   style={{ border: "none", padding: "10px" }}
//                 >
//                   <i class="fa fa-search"></i>
//                 </button>
//               </div>
//             </div>
//           </form>
//           <div
//             class="d-flex postBtn-form"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginLeft: "25%",
//             }}
//           >
//             {!user ? (
//               <>
//               <button class="btn textColor pushdown registerBtn" type="submit">
//                 <Link className="textColor text-decoration-none" to="/signup">
//                   Register
//                 </Link>
//               </button>
         
//             <span class="registerBtn">{`or`}</span>
          
//               <button class="btn textColor pushdown pushup" type="submit">
//                 <Link className="textColor text-decoration-none" to="/login">
//                   Login
//                 </Link>
//               </button>
//               </>
//             ): null}
//             {user ? (
//               <Link to="/profile">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30"
//                   height="30"
//                   fill="currentColor"
//                   class="bi bi-person-circle textColor"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
//                   <path
//                     fill-rule="evenodd"
//                     d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
//                   />
//                 </svg>
//               </Link>
//             ): null}{" "}
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             {user && (
//                <Dropdown>
//                <Dropdown.Toggle variant="white" id="dropdown-basic">
//                </Dropdown.Toggle>
//                <Dropdown.Menu>
//                  <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
//                  <Dropdown.Item><Link to="/account-settings" style={{textDecoration: 'none', color: 'black'}}>Settings</Link></Dropdown.Item>
//                </Dropdown.Menu>
//              </Dropdown>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbars;
