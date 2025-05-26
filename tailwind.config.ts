import type { Config } from "tailwindcss";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
        primary: {
          DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
          50: '#FCF0F5',
          100: '#F9D5E5',
          200: '#F4ABCB',
          300: '#EE81B0',
          400: '#E95796',
          500: '#E32D7C',
          600: '#B62463',
          700: '#891B4A',
          800: '#5C1232',
          900: '#2E0919',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
          50: '#F3F1F9',
          100: '#E1DCEF',
          200: '#C3B9DF',
          300: '#A596CF',
          400: '#9A8FBC',
          500: '#7F6BA9',
          600: '#655687',
          700: '#4C4165',
          800: '#322B44',
          900: '#191522',
        },
        muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
        accent: {
          DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
          50: '#FBF7E8',
          100: '#F5ECC5',
          200: '#ECDA8A',
          300: '#E2C850',
          400: '#D9B715',
          500: '#D4AF37',
          600: '#A98C2C',
          700: '#7F6921',
          800: '#544616',
          900: '#2A230B',
        },
        neutral: {
          50: '#F8F7F7',
          100: '#EAE8E8',
          200: '#D5D1D1',
          300: '#BFBABA',
          400: '#AAA3A3',
          500: '#958D8D',
          600: '#767070',
          700: '#585454',
          800: '#3B3838',
          900: '#1D1C1C',
        },
        destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
        border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
      },
      borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: "1" },
          '50%': { opacity: "0.5" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
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
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;