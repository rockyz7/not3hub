import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { formState, email, password, onChange, displayName } =
    useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="flex w-full text-sm flex-col justify-center items-center gap-2 p-1 animate__animated animate__fadeIn animate__faster"
      >
        <label htmlFor="email"></label>
        <input
          type="text"
          label="email"
          placeholder="email@gmail.com"
          fullWidth
          name="email"
          onChange={onChange}
          value={email}
          className="w-full border border-gray-700 placeholder:text-gray-500 text-gray-300 placeholder-gray-400 p-2 px-5 focus:shadow-sm focus:shadow-gray-600 rounded-lg  outline-none bg-gray-900  opacity-60  focus:opacity-100"
        />
        <label htmlFor="password"></label>
        <input
          label="Password"
          type="password"
          placeholder="Password"
          fullWidth
          name="password"
          onChange={onChange}
          value={password}
          className="w-full text-gray-300 border placeholder:text-gray-500 border-gray-700 placeholder-gray-400 p-2 px-5 focus:shadow-sm focus:shadow-gray-600 rounded-lg outline-none bg-gray-900  opacity-60  focus:opacity-100"
        />
        <p className={`${errorMessage ? "" : "hidden"}`}>{errorMessage}</p>
        <div className="w-full flex justify-center gap-2 mt-8">
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-1/2 bg-pink-700 p-1 text-gray-300 rounded-lg opacity-90 hover:opacity-100"
          >
            Login
          </button>

          <button
            onClick={onGoogleSignIn}
            disabled={isAuthenticating}
            className="w-1/2 bg-pink-700 p-1 text-gray-300 rounded-lg opacity-90 hover:opacity-100"
          >
            <Google sx={{ color: "#d1d5db" }} />
          </button>
        </div>

        <Link
          component={RouterLink}
          color="inherit"
          to="/auth/register"
          className="flex self-end p-2"
        >
          <p className="text-gray-400 underline text-base">Crear cuenta</p>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
