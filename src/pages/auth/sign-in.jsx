import MyContext from "@/context/MyContext";
import { setStorage } from "@/helpers/contents";
import { LoginEmployeeService } from "@/services/employee.service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  username: Yup.string().required("กรุณาระบุชื่อผู้ใช้"),
  password: Yup.string().required("กรุณาระบุรหัสผ่าน")
});

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { loader, setLoader } = useContext(MyContext);
  const [req, setReq] = useState(false);

  const onSubmitLogin = async ({ username, password }) => {
    setLoader(true);
    const resp = await LoginEmployeeService({ username, password });
    if (resp) {
      setStorage("empId", resp.id);
      setStorage("empCode", resp.code || "");
      setStorage("empUsername", resp.username);
      setStorage("empRole", resp.role_id);
      window.location.reload();
      return;
    } else {
      setReq(true);
    }
    setLoader(false);
  };

  return (
    <section className="m-8 flex gap-4 h-full justify-center items-center">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            เข้าสู่ระบบ
          </Typography>
          <Typography
            // variant="paragraph"
            color="blue-gray"
            className=" font-normal text-[20px]"
          >
            ระบบนี้ใช้สำหรับ สั่งงาน แผนกสื่อและออกแบบ
          </Typography>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={onSubmitLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            >
              <div className="mb-1 flex flex-col gap-6">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    ชื่อผู้ใช้
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="supamitr..."
                    className={`
                      ${touched && touched.username && errors && errors.username ? "!border-red-500 focus:border-red-500": "!border-blue-gray-900 focus:border-blue-gray-900"}   
                    `}
                    labelProps={{
                      className: "hidden",
                    }}
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched && touched.username && errors && errors.username
                    )}
                  />
                  {touched && touched.username && errors && errors.username && (
                    <p className="font-normal text-red-500 text-[12px]">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    รหัสผ่าน
                  </Typography>
                  <Input
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    placeholder="********"
                    className={`
                      ${touched && touched.password && errors && errors.password ? "!border-red-500 focus:border-red-500": "!border-blue-gray-900 focus:border-blue-gray-900"}   
                    `}
                    labelProps={{
                      className: "hidden",
                    }}
                    icon={
                      showPassword ? (
                        <EyeIcon onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeSlashIcon onClick={() => setShowPassword(true)} />
                      )
                    }
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched && touched.password && errors && errors.password
                    )}
                  />
                  {touched && touched.password && errors && errors.password && (
                    <p className="font-normal text-red-500 text-[12px]">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              {req && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center justify-start font-medium"
                >
                  ชื่อผู้ใช้ หรือรหัสผ่านที่คุณป้อนไม่ถูกต้อง
                </Typography>
              )}
              <Button
                disabled={loader}
                type="submit"
                className="mt-6 text-[16px]"
                fullWidth
              >
                เข้าสู่ระบบ
              </Button>             
              <Typography
                variant="paragraph"
                className="text-center text-blue-gray-500 font-medium mt-4"
              >
                ไม่ได้ลงทะเบียน?
                <Link to="/auth/sign-up" className="text-gray-900 ml-1">
                  สมัครสมาชิก
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-2/5 h-[90vh] hidden lg:block ">
        <div className="flex justify-center items-center h-full">
          <img
            src="/img/background/bg-spm.avif"
            className="h-full w-full object-cover rounded-3xl "
          />
        </div>
      </div>
    </section>
  );
}

export default SignIn;
