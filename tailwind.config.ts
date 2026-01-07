
import type { Config } from "tailwindcss";

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
		screens: {
			'xs': '475px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			// iOS-native typography scale
			fontSize: {
				'ios-title-large': ['34px', { lineHeight: '41px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'ios-title-1': ['28px', { lineHeight: '34px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'ios-title-2': ['22px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'ios-title-3': ['20px', { lineHeight: '25px', letterSpacing: '-0.01em', fontWeight: '600' }],
				'ios-headline': ['17px', { lineHeight: '22px', letterSpacing: '-0.01em', fontWeight: '600' }],
				'ios-body': ['17px', { lineHeight: '22px', letterSpacing: '-0.01em', fontWeight: '400' }],
				'ios-callout': ['16px', { lineHeight: '21px', letterSpacing: '-0.01em', fontWeight: '400' }],
				'ios-subhead': ['15px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '400' }],
				'ios-footnote': ['13px', { lineHeight: '18px', letterSpacing: '-0.01em', fontWeight: '400' }],
				'ios-caption-1': ['12px', { lineHeight: '16px', letterSpacing: '0em', fontWeight: '400' }],
				'ios-caption-2': ['11px', { lineHeight: '13px', letterSpacing: '0.01em', fontWeight: '400' }],
			},
			letterSpacing: {
				'ios-tight': '-0.01em',
				'ios-normal': '0em',
				'ios-wide': '0.01em',
			},
			// iOS-native timing functions
			transitionTimingFunction: {
				'ios-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
				'ios-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'ios-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'ios-decel': 'cubic-bezier(0, 0, 0.2, 1)',
				'ios-accel': 'cubic-bezier(0.4, 0, 1, 1)',
			},
			transitionDuration: {
				'ios-fast': '150ms',
				'ios-normal': '250ms',
				'ios-slow': '400ms',
			},
			// iOS-native spacing (8px grid)
			spacing: {
				'ios-1': '4px',
				'ios-2': '8px',
				'ios-3': '12px',
				'ios-4': '16px',
				'ios-5': '20px',
				'ios-6': '24px',
				'ios-8': '32px',
				'ios-10': '40px',
				'ios-12': '48px',
			},
			colors: {
				border: 'hsl(var(--border))',
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
					DEFAULT: 'hsl(var(--accent))',
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
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
				},
				// ElecMate brand colors
				'elec-yellow': 'hsl(var(--elec-yellow))',
				'elec-dark': 'hsl(var(--elec-dark))',
				'elec-gray': 'hsl(var(--elec-gray))',
				'elec-grey': 'hsl(var(--elec-grey))',
				'elec-light': 'hsl(var(--elec-light))',
				'elec-card': 'hsl(var(--elec-card))',
				'elec-slate': 'hsl(var(--elec-slate))',
				// EICR Classification colors
				'eicr-c1': {
					bg: 'hsl(var(--eicr-c1-bg))',
					border: 'hsl(var(--eicr-c1-border))',
					text: 'hsl(var(--eicr-c1-text))',
				},
				'eicr-c2': {
					bg: 'hsl(var(--eicr-c2-bg))',
					border: 'hsl(var(--eicr-c2-border))',
					text: 'hsl(var(--eicr-c2-text))',
				},
				'eicr-c3': {
					bg: 'hsl(var(--eicr-c3-bg))',
					border: 'hsl(var(--eicr-c3-border))',
					text: 'hsl(var(--eicr-c3-text))',
				},
				'eicr-fi': {
					bg: 'hsl(var(--eicr-fi-bg))',
					border: 'hsl(var(--eicr-fi-border))',
					text: 'hsl(var(--eicr-fi-text))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			scale: {
				'102': '1.02',
			},
			keyframes: {
				// iOS-native animations
				'ios-scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'ios-slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'ios-slide-down': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(20px)', opacity: '0' }
				},
				'ios-fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'ios-pop': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'50%': { transform: 'scale(1.02)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'ios-press': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.97)' },
					'100%': { transform: 'scale(1)' }
				},
				'ios-focus-ring': {
					'0%': { boxShadow: '0 0 0 0 hsl(var(--elec-yellow) / 0)' },
					'100%': { boxShadow: '0 0 0 4px hsl(var(--elec-yellow) / 0.15)' }
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 8px, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'lightbulb-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 hsl(var(--elec-yellow) / 0.4)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 20px 5px hsl(var(--elec-yellow) / 0.2)'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'progress-pulse': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2)'
					}
				},
			'slide-up': {
				'0%': {
					transform: 'translateY(20px)',
					opacity: '0'
				},
				'100%': {
					transform: 'translateY(0)',
					opacity: '1'
				}
			},
			'count-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(10px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'stagger-fade': {
				'0%': {
					opacity: '0',
					transform: 'translateY(10px) scale(0.95)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0) scale(1)'
				}
			},
			// Confetti animations
			'confetti-fall': {
				'0%': {
					transform: 'translateY(0) rotate(0deg)',
					opacity: '1'
				},
				'100%': {
					transform: 'translateY(100vh) rotate(720deg)',
					opacity: '0'
				}
			},
			'confetti-spin': {
				'0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
				'25%': { transform: 'rotateX(90deg) rotateY(45deg)' },
				'50%': { transform: 'rotateX(180deg) rotateY(90deg)' },
				'75%': { transform: 'rotateX(270deg) rotateY(135deg)' },
				'100%': { transform: 'rotateX(360deg) rotateY(180deg)' }
			},
			'burst': {
				'0%': {
					transform: 'rotate(var(--rotation)) translateY(0) scaleY(0)',
					opacity: '1'
				},
				'50%': {
					transform: 'rotate(var(--rotation)) translateY(-80px) scaleY(1)',
					opacity: '1'
				},
				'100%': {
					transform: 'rotate(var(--rotation)) translateY(-120px) scaleY(0)',
					opacity: '0'
				}
			},
			'star-burst': {
				'0%': {
					transform: 'rotate(var(--angle)) translateX(0)',
					opacity: '1'
				},
				'100%': {
					transform: 'rotate(var(--angle)) translateX(60px)',
					opacity: '0'
				}
			},
			'bounce-slow': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }
			},
			'scale-bounce': {
				'0%': { transform: 'scale(0)', opacity: '0' },
				'50%': { transform: 'scale(1.2)', opacity: '1' },
				'100%': { transform: 'scale(1)', opacity: '1' }
			},
			'progress-fill': {
				'0%': { width: '0%' },
				'100%': { width: 'var(--progress-width)' }
			},
			// Native mobile UX animations
			'header-collapse': {
				'0%': { height: 'var(--header-max-height, 120px)' },
				'100%': { height: 'var(--header-min-height, 56px)' }
			},
			'header-expand': {
				'0%': { height: 'var(--header-min-height, 56px)' },
				'100%': { height: 'var(--header-max-height, 120px)' }
			},
			'rubber-band': {
				'0%': { transform: 'translateY(0)' },
				'30%': { transform: 'translateY(var(--pull-distance, 80px))' },
				'50%': { transform: 'translateY(calc(var(--pull-distance, 80px) * 0.3))' },
				'70%': { transform: 'translateY(calc(var(--pull-distance, 80px) * 0.1))' },
				'100%': { transform: 'translateY(0)' }
			},
			'swipe-out-left': {
				'0%': { transform: 'translateX(0)', opacity: '1' },
				'100%': { transform: 'translateX(-100%)', opacity: '0' }
			},
			'swipe-out-right': {
				'0%': { transform: 'translateX(0)', opacity: '1' },
				'100%': { transform: 'translateX(100%)', opacity: '0' }
			},
			'pull-refresh-spin': {
				'0%': { transform: 'rotate(0deg)' },
				'100%': { transform: 'rotate(360deg)' }
			},
			'carousel-snap': {
				'0%': { scrollSnapAlign: 'start' },
				'100%': { scrollSnapAlign: 'start' }
			}
			},
			animation: {
				// iOS-native animations
				'ios-scale-in': 'ios-scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'ios-slide-up': 'ios-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'ios-slide-down': 'ios-slide-down 0.3s ease-out forwards',
				'ios-fade-in': 'ios-fade-in 0.25s ease-out forwards',
				'ios-pop': 'ios-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'ios-press': 'ios-press 0.15s ease-out',
				'ios-focus-ring': 'ios-focus-ring 0.2s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'float': 'float 3s ease-in-out infinite',
				'lightbulb-pulse': 'lightbulb-pulse 5.5s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'progress-pulse': 'progress-pulse 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
				'stagger-fade': 'stagger-fade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
				// Confetti animations
				'confetti-fall': 'confetti-fall 3s ease-out forwards',
				'confetti-spin': 'confetti-spin 1s linear infinite',
				'burst': 'burst 0.6s ease-out forwards',
				'star-burst': 'star-burst 1s ease-out forwards',
				'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
				'scale-bounce': 'scale-bounce 0.5s ease-out forwards',
				'progress-fill': 'progress-fill 1s ease-out forwards',
				// Native mobile UX animations
				'header-collapse': 'header-collapse 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
				'header-expand': 'header-expand 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
				'rubber-band': 'rubber-band 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'swipe-out-left': 'swipe-out-left 0.25s ease-out forwards',
				'swipe-out-right': 'swipe-out-right 0.25s ease-out forwards',
				'pull-refresh-spin': 'pull-refresh-spin 0.8s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
