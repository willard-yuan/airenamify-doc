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
                primary: {
                    DEFAULT: "#3b82f6", // Blue - Trust/Intelligence
                    hover: "#2563eb",
                },
                success: {
                    DEFAULT: "#2ecc71", // Green - Success/Renamed
                },
                background: {
                    DEFAULT: "#ffffff",
                    subtle: "#f9fafb",
                },
                text: {
                    main: "#111827", // Deep dark gray
                    muted: "#6b7280",
                },
                // Keeping original colors just in case, but can be removed if unused
                strongCyan: "hsl(171, 66%, 44%)",
                lightBlue: "hsl(233, 100%, 69%)",
                darkGrayishBlue: "hsl(210, 10%, 33%)",
                grayishBlue: "hsl(201, 11%, 66%)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["SF Pro Display", "Inter", "sans-serif"],
            },
            backgroundImage: {
                'hero-pattern': "url('/images/hero-pattern.svg')", // Placeholder if needed
            }
        },
    },
    plugins: [
        require("tailwind-scrollbar")
    ],
};
