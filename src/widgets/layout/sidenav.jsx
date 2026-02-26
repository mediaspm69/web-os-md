import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { getStorage } from "@/helpers/contents";
import { useState } from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const [isValid, setIsValid] = useState("");

  const empRole = getStorage("empRole");

  const handleOpenMenu = (text) => {
    setIsValid(text);
  };

//   const regex = "555"
// console.log('match', Boolean("/1234-555-".match(regex)))

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 flex item-center">
          <img src="/img/logo/spm-logo.avif" className="w-64" />
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-6 w-6 text-gray-600" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes
          .filter((ft) => ft.token === true && ft.role === empRole)
          .map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ show, icon, name, path,layout2,pages2 }) => {
                if (show === true) {
                  return (
                    <li key={name}>
                    
                         <Accordion
                        open={Boolean(isValid === name)}
                        className="w-full "
                      >
               
                        <AccordionHeader
                          className={`hover:bg-blue-gray-50 rounded-md py-3 pl-4 w-full `}
                          onClick={() => {
                            if (name === isValid) {
                              handleOpenMenu("");
                            } else {
                              handleOpenMenu(name);
                            }
                          }}
                        >
                          <div className="flex flex-row items-center justify-between w-full">
                            <div className=" flex justify-start text-blue-gray-500">
                              {icon}
                              <Typography
                                color="inherit"
                                className="font-medium  pl-4 "
                              >
                                {name}
                              </Typography>
                            </div>
                            <div>
                              {Boolean(isValid === name) ? (
                                <ChevronDownIcon className="w-5 h-5" />
                              ) : (
                                <ChevronRightIcon className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="ml-4">
                            <NavLink to={`/${layout}${path}`}>
                              {({ isActive }) => (
                                <Button
                                  variant={isActive ? "gradient" : "text"}
                                  color={
                                    isActive &&
                                    sidenavColor &&
                                    sidenavType === "dark"
                                      ? "white"
                                      : "blue-gray"
                                  }
                                  className="flex items-center gap-4 px-4 capitalize "
                                  fullWidth
                                >
                                  {icon}
                                  <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                  >
                                    {name}
                                  </Typography>
                                </Button>
                              )}
                            </NavLink>
                            {pages2.filter((ft)=> ft.show2 === true).map(({ icon2, name2, path2 }) => (
                              <div key={name2}>
                                <NavLink to={`/${layout}${path2}`}>
                                  {({ isActive }) => (
                                    <Button
                                      variant={isActive ? "gradient" : "text"}
                                      color={
                                        isActive &&
                                        sidenavColor &&
                                        sidenavType === "dark"
                                          ? "white"
                                          : "blue-gray"
                                      }
                                      className="flex items-center gap-4 px-4 capitalize "
                                      fullWidth
                                    >
                                      {icon2}
                                      <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                      >
                                        {name2}
                                      </Typography>
                                    </Button>
                                  )}
                                </NavLink>
                              </div>
                            ))}
                          </div>
                        </AccordionBody>
                      </Accordion>                                         
                    </li>
                  );
                } else if (show === false) {
                  return (
                    <li key={name}>
                      <NavLink to={`/${layout}${path}`}>
                        {({ isActive }) => (
                          <Button
                            variant={isActive ? "gradient" : "text"}
                            onClick={() => {
                              handleOpenMenu("");
                            }}
                            color={
                              isActive && sidenavColor && sidenavType === "dark"
                                ? "white"
                                : "blue-gray"
                            }
                            className="flex items-center gap-4 px-4 capitalize"
                            fullWidth
                          >
                            {icon}
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              {name}
                            </Typography>
                          </Button>
                        )}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Supamitr Hospotal",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
