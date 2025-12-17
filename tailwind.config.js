/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				gold: {
					DEFAULT: '#f59e0b',
					light: '#fbbf24',
					dark: '#d97706',
				},
				dame: {
					black: '#0a0a0a',
					dark: '#141414',
					gray: '#1f1f1f',
					muted: '#2a2a2a',
					text: '#e5e5e5',
					textMuted: '#a3a3a3',
				},
				primary: {
					DEFAULT: '#f59e0b',
					foreground: '#0a0a0a',
				},
				secondary: {
					DEFAULT: '#1f1f1f',
					foreground: '#e5e5e5',
				},
				accent: {
					DEFAULT: '#f59e0b',
					foreground: '#0a0a0a',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: '#2a2a2a',
					foreground: '#a3a3a3',
				},
				popover: {
					DEFAULT: '#141414',
					foreground: '#e5e5e5',
				},
				card: {
					DEFAULT: '#1f1f1f',
					foreground: '#e5e5e5',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in': {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				'slide-up': {
					from: { opacity: 0, transform: 'translateY(20px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'pulse-gold': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.4)' },
					'50%': { boxShadow: '0 0 0 10px rgba(245, 158, 11, 0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'pulse-gold': 'pulse-gold 2s infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
