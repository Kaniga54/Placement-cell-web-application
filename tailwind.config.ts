import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
			},
			colors: {
				brand: {
					bg: "var(--bg)",
					surface: "var(--surface)",
					surfaceSoft: "var(--surface-soft)",
					text: "var(--text)",
					textSoft: "var(--text-soft)",
					textMuted: "var(--text-muted)",
					border: "var(--border)",
					accent: "var(--accent)",
					accentDark: "var(--accent-dark)",
					accentLight: "var(--accent-light)",
					green: "var(--green)",
					greenLight: "var(--green-light)",
					red: "var(--red)",
					redLight: "var(--red-light)",
					yellow: "var(--yellow)",
					yellowLight: "var(--yellow-light)",
				},
				border: 'hsl(var(--border-bridge))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent-bridge))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			boxShadow: {
				'brand-sm': 'var(--shadow-sm)',
				'brand-md': 'var(--shadow-md)',
				'brand-lg': 'var(--shadow-lg)',
				'brand-accent': '0 8px 20px rgba(201, 71, 40, 0.22)',
				'brand-accent-lg': '0 12px 28px rgba(201, 71, 40, 0.26)',
			},
			borderRadius: {
				'brand-sm': 'var(--radius-sm)',
				'brand-md': 'var(--radius-md)',
				'brand-lg': 'var(--radius-lg)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
