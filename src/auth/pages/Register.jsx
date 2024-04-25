import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El email debe tener un @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener más de 6 letras",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onChange,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Registrar">
      <form
        onSubmit={onSubmit}
        className="flex w-full text-sm flex-col justify-center items-center gap-1 p-1  animate__animated animate__fadeIn animate__faster"
      >
        <label htmlFor="displayName"></label>
        <input
          label="Name"
          type="text"
          placeholder="John Doe"
          name="displayName"
          value={displayName}
          onChange={onChange}
          error={!!displayNameValid && formSubmitted}
          className={`${
            !!displayNameValid && formSubmitted
              ? "border-2 border-pink-700"
              : ""
          } w-full border border-gray-700 placeholder:text-gray-500 text-gray-300 placeholder-gray-400 p-2 px-5 focus:shadow-sm focus:shadow-gray-600 rounded-lg  outline-none bg-gray-900  opacity-60  focus:opacity-100`}
        />
        <p className="self-start flex text-gray-500 text-sm">
          {!!displayNameValid ? displayNameValid : ""}
        </p>
        <label htmlFor="email"></label>
        <input
          type="text"
          label="email"
          placeholder="email@gmail.com"
          fullWidth
          name="email"
          onChange={onChange}
          value={email}
          className={`${
            !!emailValid && formSubmitted ? "border-2 border-pink-700" : ""
          } w-full border border-gray-700 placeholder:text-gray-500 text-gray-300 placeholder-gray-400 p-2 px-5 focus:shadow-sm focus:shadow-gray-600 rounded-lg  outline-none bg-gray-900  opacity-60  focus:opacity-100`}
        />
        <p className="self-start flex text-gray-500 text-sm">
          {!!emailValid ? emailValid : ""}
        </p>
        <label htmlFor="password"></label>
        <input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={password}
          className={`${
            !!passwordValid && formSubmitted ? "border-2 border-pink-700" : ""
          } w-full border border-gray-700 placeholder:text-gray-500 text-gray-300 placeholder-gray-400 p-2 px-5 focus:shadow-sm focus:shadow-gray-600 rounded-lg  outline-none bg-gray-900  opacity-60  focus:opacity-100`}
        />
        <p className="self-start flex text-gray-500 text-sm">
          {!!passwordValid ? passwordValid : ""}
        </p>
        <p className={`${errorMessage ? "" : "hidden"}`}>{errorMessage}</p>
        <div className="w-full flex justify-center gap-2 mt-8">
          <button
            type="submit"
            disabled={isCheckingAuthentication}
            className="w-1/2 bg-pink-800  p-1 text-gray-300 rounded-lg opacity-90 hover:opacity-100"
          >
            Crear cuenta
          </button>
        </div>

        <p className="text-gray-400 flex self-end pt-5 text-base">
          ¿Ya tienes cuenta?
          <Link component={RouterLink} color="inherit" to="/auth/login">
            <span className="pl-1"> Login</span>
          </Link>
        </p>

        {/* <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid> */}
      </form>
    </AuthLayout>
  );
};

export default Register;
