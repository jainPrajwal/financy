import { useAuth } from "../../hooks/useAuth";

import { Loader } from "kaali-ui";
import { useState } from "react";
import { UserLoginCredentials } from "../../constants/auth.types";
import { default as authStyles } from "./Auth.module.css";
import { Tooltip } from "kaali-ui";
import { Link } from "react-router-dom";


const Login = () => {

  const [showPassword, setShowPassword] = useState({
    initial: false,
    confirm: false
  });
  const {
    wrapperSvgWave,
    inputPasswordWrapper,
    passwordIcon,
    input,
    formHeader,
    signinForm,
    visHidden
  } = authStyles;

  const [form, setForm] = useState({
    email: "",
    password: "",
    touched: {
      email: false,
      password: false
    },
    validations: {
      validateEmail: function (email: string) {
        if (email.length <= 0) return `Email cannot be blank`;
        if (
          !email.match(
            /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)(\.[a-zA-Z]{2,5})?$/
          )
        ) {
          return `Invalid Email Format.`;
        }
        return ``;
      },
      validatePassword: function (password: string) {
        if (password.length <= 0) return `Password cannot be blank`;
        return ``;
      }
    },
    isFormValid: {
      isEmailValid: false,
      isPasswordValid: false
    }
  });

  const { loginUserWithCredentials } = useAuth();
  const LoginHandler = async () => { };

  return (
    <>
      <div
        className={`p-1`}
        style={{ height: `100vh`, display: `flex`, flexDirection: `column` }}
      >
        <div
          className={`white-space-nowrap header-secondary text-white text-center text-bold p-lg m-lg`}
        >
          Start Your Investment Journey Now!!
        </div>
        <form
          className={`${signinForm}`}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(`Sign Up succesful!`, form);
            if (form.isFormValid) {

              loginUserWithCredentials({
                email: form.email,
                password: form.password
              });
            }
          }}
        >
          <div>
          </div>
          <div className="p-1">
            <div
              className={`${formHeader} text-bold header header-secondary  text-upper`}
            >
              login
            </div>

            <div className="p-md">
              <label className="d-block"></label>
              <Tooltip
                label={form?.validations?.validateEmail(form?.email)}
                position={`top`}
                cssTooltip={{ padding: `8px`, width: `initial` }}
                mode={`light`}
              >
                <div>
                  <input
                    type="email"
                    value={form?.email}
                    placeholder="Enter Email"
                    className={`${input}  p-md w-100`}
                    required
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                        isFormValid:
                          form?.validations?.validateEmail(e.target.value)
                            ?.length > 0
                            ? { ...prevState.isFormValid, isEmailValid: false }
                            : { ...prevState.isFormValid, isEmailValid: true }
                      }));
                    }}
                    onBlur={() => {
                      setForm((prevState) => ({
                        ...prevState,
                        touched: { ...prevState.touched, email: true }
                      }));
                    }}
                  />
                </div>
              </Tooltip>
              {
                <div
                  className={`pt-sm ${!form?.isFormValid?.isEmailValid && form?.touched["email"]
                    ? ``
                    : `${visHidden}`
                    }`}
                  style={{ color: `var(--tube-theme-error)` }}
                >
                  {form?.validations?.validateEmail(form?.email)}
                </div>
              }
            </div>

            <div className="p-md">
              <label className="d-block"></label>
              <Tooltip
                label={form?.validations?.validatePassword(form?.password)}
                position={`top`}
                cssTooltip={{ padding: `8px`, width: `initial` }}
                mode={`light`}
              >
                <div className={`${inputPasswordWrapper}`}>
                  <input
                    value={form?.password}
                    type={`${showPassword.initial ? `text` : `password`}`}
                    placeholder="Enter Password"
                    className={`${input}  p-md w-100`}
                    required
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                        isFormValid:
                          form?.validations?.validatePassword(e.target.value)
                            ?.length > 0
                            ? {
                              ...prevState?.isFormValid,
                              isPasswordValid: false
                            }
                            : {
                              ...prevState?.isFormValid,
                              isPasswordValid: true
                            }
                      }));
                    }}
                    onBlur={() => {
                      setForm((prevState) => ({
                        ...prevState,
                        touched: { ...prevState.touched, password: true }
                      }));
                    }}
                  />

                  {showPassword?.initial ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill={"#aaacc0"}
                      className={`${passwordIcon} text-white`}
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          initial: !prevState.initial
                        }))
                      }
                    >
                      <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      fill={"#aaacc0"}
                      className={`${passwordIcon}`}
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          initial: !prevState.initial
                        }))
                      }
                    >
                      <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
                    </svg>
                  )}
                </div>
              </Tooltip>

              {
                <span
                  className={`pt-sm d-block ${!form?.isFormValid?.isPasswordValid &&
                    form?.touched["password"]
                    ? ``
                    : `${visHidden}`
                    }`}
                  style={{ color: `var(--tube-theme-error)` }}
                >
                  {" "}
                  {form?.validations?.validatePassword(form?.password)}
                </span>
              }
            </div>

            <div className="p-md">
              <button
                type="submit"
                disabled={Object.values(form?.isFormValid).includes(false)}
                className="btn btn-danger w-100"
                style={{ paddingInline: 0, margin: 0 }}
              >
                <span className="text-upper text-bold">{`${`CONTINUE`}`}</span>
              </button>
            </div>
            <div className="p-md">
              <button
                onClick={async () => { }}
                name="loginAsGest"
                className="btn btn-danger w-100"
                style={{ paddingInline: 0, margin: 0 }}
              >
                <span className="text-upper text-bold">{`${`log in as guest`}`}</span>
              </button>
            </div>
            <div className="p-sm text-center">
              <Link to="/signup">
                <span className={`text-white`}>
                  Don't have an Account with us? Click here to Sign Up
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { Login };
