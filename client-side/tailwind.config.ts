import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'100': '#F5F5F7',
  				'200': '#E0F3FC',
  				'300': '#29323F',
  				'400': '#B8BFC5'
  			}
  		},
  		borderRadius: {
  			'1': '5px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			xs: '420px',
  			sm: '750px',
  			lg: '1300px'
  		},
  		boxShadow: {
  			'light-100': '0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)'
  		},
  		fontSize: {
  			'desktop-large': '26px',
  			'destop-medium': '24px',
  			'desktop-small': '16px',
  			'mobile-large': '20px',
  			'mobile-medium': '16px',
  			'mobile-small': '12px'
  		},
  		fontFamily: {
  			inter: [
  				'var(--font-inter)'
  			],
  			montserrat: [
  				'var(--font-montserrat)'
  			]
  		},
  		padding: {
  			small: '8px',
  			large: '20px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
