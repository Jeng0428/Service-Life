import Link from "next/link";
import { useState, useContext } from "react";
import { IndiceContext } from "../../contexts";

const UsersNavbar = ({ value }) => {
  const { displaySideMenu, toggleSideMenu } = useContext(IndiceContext);
  const [display, setDisplay] = useState(false);

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
        <div className="sidemenu-header ">
          <Link href="/">
            <a className="navbar-brand   d-flex align-items-center active">
              <img src="/images/black-logo.png" alt="image" />
            </a>
          </Link>

          <div
            className="responsive-burger-menu d-block d-lg-none"
            onClick={toggleSideMenu}
          >
            <i className="bx bx-x"></i>
          </div>
        </div>

        <div className="sidemenu-body">
          <ul
            className="sidemenu-nav metisMenu h-100"
            id="sidemenu-nav"
            data-simplebar
          >
            <li className="nav-item-title">Main</li>
            {[
              {
                iconClass: "bx  bx-copy",
                path: "bookings",
                title: "Bookings",
              },
            ].map(({ iconClass, path, title }) => (
              <li className="nav-item" key={path}>
                <Link href={`/users/${path}`}>
                  <a className={`${path === value ? "active" : ""}`}>
                    <span className="icon">
                      <i className={iconClass}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                  </a>
                </Link>
              </li>
            ))}

            <li className="nav-item-title">Listings</li>
            {[
              {
                iconClass: "bx bx-plus-circle",
                path: "complains",
                title: "Complain",
              },
              {
                iconClass: "bx bx-plus-circle",
                path: "orderfooduser",
                title: "Order Food",
              },
            ].map(({ iconClass, path, title }) => (
              <li className="nav-item" key={path}>
                <Link href={`/users/${path}`}>
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
                <Link href={`/users/${path}`}>
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

export default UsersNavbar;
