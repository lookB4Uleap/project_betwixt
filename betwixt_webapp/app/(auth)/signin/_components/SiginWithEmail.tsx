const signInWithEmail = () => {
    return (
        <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    // value={email}
                                    required
                                    placeholder="Email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5
                   dark:bg-gray-900 text-gray-900 dark:text-gray-100
                   shadow-sm ring-1 ring-inset 
                   ring-gray-300 dark:ring-gray-800
                  placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 dark:focus:ring-gray-950
                  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold 
                  text-indigo-600 hover:text-indigo-500
                  dark:text-cyan-200 dark:hover:text-cyan-400"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    // value={password}
                                    // onChange={(e) =>
                                    //     setPassword(e.target.value)
                                    // }
                                    className="block w-full rounded-md border-0 py-1.5
                  dark:bg-gray-900 text-gray-900 dark:text-gray-100
                  shadow-sm ring-1 ring-inset 
                  ring-gray-300 dark:ring-gray-800
                 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset 
                 focus:ring-indigo-600 dark:focus:ring-gray-950
                 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md 
                bg-indigo-600  px-3 py-1.5 text-sm font-semibold leading-6 
                text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600"
                                // onSubmit={signInWithEmail}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
    );
}