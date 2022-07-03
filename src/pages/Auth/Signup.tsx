import { RadioButton } from "kaali-ui";
import { useState } from "react";

import { default as authStyles } from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export const Signup = () => {
    const [showPassword, setShowPassword] = useState({
        initial: false,
        confirm: false
    });

    const { signUpUserWithCredentials } = useAuth();
    const {
        wrapperSvgWave,
        inputPasswordWrapper,
        passwordIcon,
        input,
        formHeader,
        signinForm,
        container,
        checkmark,
        visHidden
    } = authStyles;

    const [form, setForm] = useState({
        name: "",
        email: "",
        initialPassword: "",
        confirmPassword: "",
        gender: "",
        touched: {
            name: false,
            email: false,
            initialPassword: false,
            confirmPassword: false
        },
        validations: {
            validateName: function (name: string) {
                if (name.length <= 0) {
                    return `Name cannot be blank`;
                } else if (!name.match(/^[A-Za-z]+$/))
                    return `Name can only contain alphabets`;

                return ``;
            },
            validateEmail: function (email: string) {
                if (email.length <= 0) {
                    return `Email cannot be blank`;
                }
                if (
                    !email.match(
                        /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)(\.[a-zA-Z]{2,5})?$/
                    )
                ) {
                    return `Invalid Email Format.`;
                }
                return ``;
            },
            validateIndividualPassword: function (password: string) {
                if (password.length <= 0) {
                    return `Password cannot be blank`;
                } else if (password.length < 5) {
                    return `At least 5 characters required`;
                }

                return ``;
            },
            validateBothPasswords: function (initial: string, confirm: string) {
                if (initial !== confirm) return `Passwords do not match!`;

                return ``;
            }
        },
        isFormValid: {
            isNameValid: false,
            isEmailValid: false,
            isInitialPasswordValid: false,
            isConfirmPasswordValid: false,
            isPasswordsEqual: false
        }
    });



    return (
        <>
            <div
                className={`p-1`}
                style={{ height: `100vh`, display: `flex`, flexDirection: `column` }}
            >
                <div
                    className={`d-flex jc-center ai-center`}
                >
                    <div style={{ width: `48px`, height: `48px` }}>
                        <img
                            src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1653841636/Tube_Stox-removebg-preview_ezjluc_qkz2zk.png"
                            alt="logo"
                            width={`100%`}
                            height={`100%`}
                        />
                    </div>
                    <div className="header-secondary text-white">Financy</div>
                </div>
                <div
                    className={`white-space-nowrap header-secondary text-white text-center text-bold p-lg m-lg`}
                >
                    Take Your First Step Towards Successful Investment Now!!
                </div>
                <form
                    className={`${signinForm}`}
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(`Sign Up succesful!`, form);
                        if (form.isFormValid) {

                            signUpUserWithCredentials({
                                name: form.name,
                                email: form.email,
                                password: form.confirmPassword,
                                gender: form.gender,

                            });
                        }
                    }}
                >

                    <div className="p-1">
                        <div
                            className={`${formHeader} text-bold header header-secondary  text-upper`}
                        >
                            sign up
                        </div>
                        <div className="p-md">
                            <label className="d-block pos-relative">
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className={`${input}  p-md w-100`}
                                    value={form?.name}
                                    onChange={(e) => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                            isFormValid:
                                                form?.validations?.validateName(e.target.value)
                                                    ?.length > 0
                                                    ? { ...prevState.isFormValid, isNameValid: false }
                                                    : { ...prevState.isFormValid, isNameValid: true }
                                        }));
                                    }}
                                    onBlur={() => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            touched: { ...prevState.touched, name: true }
                                        }));
                                    }}
                                />
                                <span className="tooltip tooltip-top tooltip-dark p-md">
                                    Name can have alphabets
                                </span>
                            </label>
                            {
                                <span
                                    className={`d-block ${!form?.isFormValid?.isNameValid && form?.touched["name"]
                                        ? ``
                                        : `${visHidden}`
                                        }`}
                                    style={{ color: "var(--tube-theme-error-light)" }}
                                >
                                    {" "}
                                    {form?.validations?.validateName(form?.name)}
                                </span>
                            }
                        </div>
                        <div className="p-md">
                            <label className="d-block pos-relative">
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
                                <span className="tooltip tooltip-top tooltip-dark p-md">
                                    Email must have a @
                                </span>
                            </label>
                            {
                                <span
                                    className={`d-block ${!form?.isFormValid?.isEmailValid && form?.touched["email"]
                                        ? ``
                                        : `${visHidden}`
                                        }`}
                                    style={{ color: "var(--tube-theme-error-light)" }}
                                >
                                    {" "}
                                    {form?.validations?.validateEmail(form?.email)}
                                </span>
                            }
                        </div>
                        <div className="p-md">
                            <div className={`${inputPasswordWrapper}`}>
                                <label className="d-block pos-relative">
                                    <input
                                        value={form?.initialPassword}
                                        type={`${showPassword.initial ? `text` : `password`}`}
                                        placeholder="Enter Password"
                                        className={`${input}  p-md w-100`}
                                        required
                                        onChange={(e) => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                initialPassword: e.target.value,
                                                isFormValid:
                                                    form?.validations?.validateIndividualPassword(
                                                        e.target.value
                                                    )?.length > 0
                                                        ? {
                                                            ...prevState.isFormValid,
                                                            isInitialPasswordValid: false
                                                        }
                                                        : form?.validations?.validateBothPasswords(
                                                            e.target.value,
                                                            form?.confirmPassword
                                                        ).length > 0
                                                            ? {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: false,
                                                                isInitialPasswordValid: true
                                                            }
                                                            : {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: true,
                                                                isInitialPasswordValid: true
                                                            }
                                            }));
                                        }}
                                        onBlur={() => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                touched: {
                                                    ...prevState.touched,
                                                    initialPassword: true
                                                }
                                            }));
                                        }}
                                    />
                                    <span className="tooltip tooltip-top tooltip-dark p-md ">
                                        Password should have atleast 5 characters
                                    </span>
                                </label>
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
                                        className={`${passwordIcon} text-white`}
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
                            {
                                <span
                                    className={`d-block ${!form?.isFormValid?.isInitialPasswordValid &&
                                        form?.touched["initialPassword"]
                                        ? ``
                                        : `${visHidden}`
                                        }`}
                                    style={{ color: "var(--tube-theme-error-light)" }}
                                >
                                    {" "}
                                    {form?.validations?.validateIndividualPassword(
                                        form?.initialPassword
                                    )}
                                </span>
                            }
                        </div>
                        <div className="p-md">
                            <div className={`${inputPasswordWrapper}`}>
                                <label className="d-block pos-relative">
                                    <input
                                        value={form?.confirmPassword}
                                        type={`${showPassword?.confirm ? `text` : `password`}`}
                                        placeholder="Confirm Password"
                                        className={`${input}  p-md w-100`}
                                        required
                                        onChange={(e) => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                confirmPassword: e.target.value,
                                                isFormValid:
                                                    form?.validations?.validateIndividualPassword(
                                                        e.target.value
                                                    )?.length > 0
                                                        ? {
                                                            ...prevState.isFormValid,
                                                            isConfirmPasswordValid: false
                                                        }
                                                        : form?.validations?.validateBothPasswords(
                                                            form?.initialPassword,
                                                            e.target.value
                                                        ).length > 0
                                                            ? {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: false,
                                                                isConfirmPasswordValid: true
                                                            }
                                                            : {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: true,
                                                                isConfirmPasswordValid: true
                                                            }
                                            }));
                                        }}
                                        onBlur={() => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                touched: {
                                                    ...prevState.touched,
                                                    confirmPassword: true
                                                }
                                            }));
                                        }}
                                    />
                                    <span className="tooltip tooltip-top tooltip-dark p-md ">
                                        Password should have atleast 5 characters
                                    </span>
                                </label>

                                {showPassword?.confirm ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        fill={"#aaacc0"}
                                        className={`${passwordIcon} text-white`}
                                        onClick={() =>
                                            setShowPassword((prevState) => ({
                                                ...prevState,
                                                confirm: !prevState.confirm
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
                                        className={`${passwordIcon} text-white`}
                                        onClick={() =>
                                            setShowPassword((prevState) => ({
                                                ...prevState,
                                                confirm: !prevState.confirm
                                            }))
                                        }
                                    >
                                        <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
                                    </svg>
                                )}
                            </div>

                            {
                                <span
                                    className={`d-block ${!form?.isFormValid?.isConfirmPasswordValid &&
                                        form?.touched["confirmPassword"]
                                        ? ``
                                        : `${visHidden}`
                                        }`}
                                    style={{ color: "var(--tube-theme-error-light)" }}
                                >
                                    {" "}
                                    {form?.validations?.validateIndividualPassword(
                                        form?.confirmPassword
                                    )}
                                </span>
                            }
                            {
                                <span
                                    className={`d-block ${!form?.isFormValid?.isPasswordsEqual &&
                                        form?.touched["initialPassword"] &&
                                        form?.touched["confirmPassword"]
                                        ? ``
                                        : `${visHidden}`
                                        }`}
                                    style={{ color: "var(--tube-theme-error-light)" }}
                                >
                                    {" "}
                                    {form?.validations?.validateBothPasswords(
                                        form?.initialPassword,
                                        form?.confirmPassword
                                    )}
                                </span>
                            }
                        </div>
                        <div className={`d-flex ai-center jc-space-around p-lg`}>
                            <div className="">
                                <label htmlFor="male" className={`cursor-pointer ${container}`}>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setForm(prevState => ({
                                                ...prevState, gender: e.target.value
                                            }))
                                        }}
                                        value={`male`}
                                        type="radio" name={`gender`} id="male" />
                                    Male
                                    <span className={`${checkmark}`}></span>
                                </label>
                            </div>
                            <div className="">
                                <label htmlFor="female" className={`cursor-pointer ${container}`}>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setForm(prevState => ({
                                                ...prevState, gender: e.target.value
                                            }))
                                        }}
                                        value={`female`}
                                        type="radio" name={`gender`} id="female" />
                                    Female
                                    <span className={`${checkmark}`}></span>
                                </label>
                            </div>
                            <div className="">
                                <label htmlFor="others" className={`cursor-pointer ${container}`}>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setForm(prevState => ({
                                                ...prevState, gender: e.target.value
                                            }))
                                        }}
                                        value={`others`}
                                        type="radio" name={`gender`} id="others" />
                                    Others
                                    <span className={`${checkmark}`}></span>
                                </label>
                            </div>
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
                        <div className="p-sm text-center">
                            Already have an Account?
                            <Link to="/login">
                                <span className={`text-white`}>
                                    <span className="border-bottom-sm"> Click here to Login</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </form>


            </div>
        </>
    );
};


