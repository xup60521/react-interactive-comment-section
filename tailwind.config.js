/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                rubik: ["Rubik", "sans-serif"]
            },
            colors: {
                moderate_blue: "hsl(238, 40%, 52%)",
                soft_red: "hsl(358, 79%, 66%)",
                light_grayish_blue: "hsl(239, 57%, 85%)",
                pale_red: "hsl(357, 100%, 86%)",
                dark_blue: "hsl(212, 24%, 26%)",
                grayish_blue: "hsl(211, 10%, 45%)",
                light_gray: "hsl(223, 19%, 93%)",
                very_light_gray: "hsl(228, 33%, 97%)"
            }
        },
    },
    plugins: [],
}

