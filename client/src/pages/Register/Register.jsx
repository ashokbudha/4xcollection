import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/auth.service";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      console.log(result);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 grid place-items-center overflow-y-auto bg-black/55 p-5"
      role="presentation"
      onClick={(event) => event.stopPropagation()}
    >
      <section
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 shadow-2xl shadow-black/30"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20"
          aria-label="Close sign up"
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-white">
            4x
          </div>
          <h1 id="signup-title" className="text-3xl font-semibold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Join 4X Collection and save the pieces you love.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              {...register("fullName", {
                required: "Full name is required",
              })}
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              {...register("email", { required: "Email is required" })}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-username"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Username
            </label>

            <input
              id="signup-username"
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-phone"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Phone Number
            </label>

            <input
              id="signup-phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
              })}
              placeholder="9800000000"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-avatar"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Profile Picture
            </label>

            <input
              id="signup-avatar"
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "Profile picture is required",
              })}
              className="block w-full text-sm text-slate-300
    file:mr-4
    file:rounded-lg
    file:border-0
    file:bg-cyan-500
    file:px-4
    file:py-2
    file:text-white
    hover:file:bg-cyan-600"
            />

            {errors.avatar && (
              <p className="mt-1 text-sm text-red-400">
                {errors.avatar.message}
              </p>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms",
              })}
              className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Log in
          </button>
        </p>
      </section>
    </div>
  );
};

export default Register;
