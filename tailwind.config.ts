import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-initial':
          'linear-gradient(to bottom right, #bdc3cc, #96a2b1, #8b9aaa, #a3a7b1, #c0afa9, #bd9284)',
        'gradient-clear-night':
          'linear-gradient(to right, #264561, #1F516D, #255074, #224C70, #102143, #0C1A36)',
        'gradient-clear-day':
          'linear-gradient(to right, #c1c8d1, #8daac0, #cfb5ae, #e0b6ac, #c38171, #ca927a)',
        'gradient-cloudy-day':
          'linear-gradient(to right, #8e9b9e, #b8b4ac, #bea086, #a28167, #97745d, #946a50)',
        'gradient-cloudy-night':
          'linear-gradient(to right, #989AA7, #93939F, #66758C, #667789, #405574, #363A52)',
      },
    },
  },
}

export default config
