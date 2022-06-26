import { useAuth } from "../../hooks/useAuth";

import { Loader } from "kaali-ui";
import { useState } from "react";
import { UserLoginCredentials } from "../../constants/auth.types";

export const Login = () => {
  console.log(`Login rendering`);
  const [userLoginCredentials, setUserLoginCredentials] =
    useState<UserLoginCredentials>({
      email: null,
      password: null,
    });

  const { loginUserWithCredentials, status } = useAuth();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          loginUserWithCredentials(userLoginCredentials);
        }}
        className="p-1 d-flex jc-center ai-center f-direction-col"
        style={{
          maxWidth: `400px`,
          margin: `0 auto`,
        }}
      >
        <div className="w-100">
          <input
            className="p-1 my-lg  w-100"
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setUserLoginCredentials((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-100">
          <input
            className="p-1 my-lg  w-100"
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setUserLoginCredentials((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-100 pt-lg mt-lg">
          <button className="btn btn-primary w-100" type="submit">
            {status === `loading` ? (
              <div className="d-flex jc-center">
                <Loader width={`fit-content`} height={`fit-content`} />
              </div>
            ) : (
              `Login`
            )}
          </button>
        </div>
      </form>
    </>
  );
};
