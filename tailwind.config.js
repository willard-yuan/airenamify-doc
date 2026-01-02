/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            colors: {
                strongCyan: "hsl(171, 66%, 44%)",
                lightBlue: "hsl(233, 100%, 69%)",
                darkGrayishBlue: "hsl(210, 10%, 33%)",
                grayishBlue: "hsl(201, 11%, 66%)",
                brandBlue: "#3b82f6",
                brandGreen: "#2ecc71",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar")
    ],
};
