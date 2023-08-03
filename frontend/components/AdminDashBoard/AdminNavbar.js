import Link from "next/link";
import { useState, useContext } from "react";
import { IndiceContext } from "../../contexts";
import cn from "classnames";
import * as Icons from "../../components/Common/Icons"

const AdminNavbar = ({ value }) => {
  const { displaySideMenu, toggleSideMenu } = useContext(IndiceContext);
  const [display, setDisplay] = useState(false);
  const [showAside, setShowAside] = useState(false)

  const listingToggle = () => {
    setDisplay(!display);
  };

  return (
    <>
      <div
        className={
          displaySideMenu
            ? "sidemenu-area active-sidemenu-area"
            : "sidemenu-area"
        }
      >
        <div className="sidemenu-header">
          <Link href="/">
            <a className="navbar-brand d-flex align-items-center active">
              <img src="/images/home/logo.png" alt="image"  className='logohome logocenter'/>
            </a>
          </Link>

        </div>
        <div style={{width: 60}} className="menu-mob d-xl-none">
                {showAside ? (
                  <div onClick={() => setShowAside(false)} className="bg-white"><Icons.CloseIcon/></div>
                ): (
                  <div onClick={() => setShowAside(true)} className="bg-white"><Icons.HamburgerIcon/></div>
                  
                )}
              </div>
              {showAside && (
                <div onClick={() => setShowAside(false)} className="overlay d-xl-none"></div>
              )}

        <div className={cn("", {
          "sidemenu-body": showAside,
          "hide-sidemenu-body": !showAside
        })}>
          <ul
            className="sidemenu-nav metisMenu h-100"
            id="sidemenu-nav"
            data-simplebar
          >
            <li className="nav-item-title">Main</li>
            {[
              {
                iconClass: "bx bx-home-circle",
                path: "",
                title: "Dashboard",
              }, 
              {
                iconClass: "bx  bx-copy",
                path: "scheduleVisit",
                title: "Schedule Visit",
              },
              {
                iconClass: "bx  bx-copy",
                path: "advanceBooking",
                title: "Advance Booking",
              },
               {
                iconClass: "bx  bx-copy",
                path: "rentPayment",
                title: "Rent Payment",
              },
              {
                iconClass: "bx  bx-copy",
                path: "complains",
                title: "Complains",
              },

            ].map(({ iconClass, path, title }) => (
              <li className="nav-item" key={path}>
                <Link href={`/admin/${path}`}>
                  <a className={`${path === value ? "active" : ""}`}>
                    <span className="icon">
                      <i className={iconClass}></i>
                    </span>
                    <span onClick={() => setShowAside(false)} className="menu-title">{title}</span>
                  </a>
                </Link>
              </li>
            ))}

            <li className="nav-item-title">Listings</li>
            {[
              {
                iconClass: "bx bx-layer",
                path: "my-listing",
                title: "My Listings",
              },
              {
                iconClass: "bx bx-layer",
                path: "users",
                title: "Users",
              },

              {
                iconClass: "bx bx-plus-circle",
                path: "add-listing",
                title: "Add Listings",
              },
              {
                iconClass: "bx bx-plus-circle",
                path: "add-city",
                title: "Add City",
              },
              {
                iconClass: "bx bx-plus-circle",
                path: "add-room-type",
                title: "Add Room Type",
              },
              {
                iconClass: "bx bx-plus-circle",
                path: "add-aminities",
                title: "Add Aminities",
              },
              {
                iconClass: "bx bx-plus-circle",
                path: "teamMember",
                title: "Team Member",
              },
               {
                iconClass: "bx bx-plus-circle",
                path: "addMeals",
                title: "Add Meals",
              },
               {
                iconClass: "bx bx-plus-circle",
                path: "foodorders",
                title: "FoodOrders",
              },
            ].map(({ iconClass, path, title }) => (
              <li className="nav-item" key={path}>
                <Link href={`/admin/${path}`}>
                  <a className={`${path === value ? "active" : ""}`}>
                    <span className="icon">
                      <i className={iconClass}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                  </a>
                </Link>
              </li>
            ))}

            <li className="nav-item-title">Account</li>

            {[
              {
                iconClass: "bx bxs-user-circle",
                path: "profile",
                title: "Profile",
              },
            ].map(({ iconClass, path, title }) => (
              <li className="nav-item" key={path}>
                <Link href={`/admin/${path}`}>
                  <a className={`${path === value ? "active" : ""}`}>
                    <span className="icon">
                      <i className={iconClass}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                  </a>
                </Link>
              </li>
            ))}

            <li className="nav-item">
              <a>
                <span className="icon">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="menu-title">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
          </>
  );
};

export default AdminNavbar;
