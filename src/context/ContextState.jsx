import  {  useState } from "react";

export default function ContextState() {
  const [loader, setLoader] = useState(false);
  const [dataEmp, setDataEmp] = useState(null);
  const [dpms, setDpms] = useState(null);
  // const [positions, setPositions] = useState(null);
  // const [roles, setRoles] = useState(null);

  return {
    loader,
    dataEmp,
    dpms,
    setLoader,
    setDataEmp,
    setDpms
  };
}
