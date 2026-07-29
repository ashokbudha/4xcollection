function LoginPage({ onClose, onShowSignup }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

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
        aria-labelledby="login-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20"
          aria-label="Close login"
        >
          &times;
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-white">
            4x
          </div>
          <h1 id="login-title" className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-300">Sign in to continue your shopping journey.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-200">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-200">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-400" />
              Remember me
            </label>
            <button type="button" className="text-cyan-400 transition hover:text-cyan-300">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onShowSignup} className="font-medium text-cyan-400 transition hover:text-cyan-300">
            Create one
          </button>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
