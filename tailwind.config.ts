const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      // Paleta Gaming Neon
      'gaming-dark': '#0a0e27',
      'gaming-darker': '#050812',
      'gaming-cyan': '#00d9ff',
      'gaming-purple': '#b827dc',
      'gaming-pink': '#ff0080',
      'gaming-green': '#39ff14',
      'gaming-blue': '#0066cc',
      'gaming-orange': '#ff6600',
      'gaming-text': '#e0e7ff',
      'gaming-muted': '#9ca3af',
      'gaming-darkGray': '#374151',
    },
    extend: {
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%)',
        'gradient-neon': 'linear-gradient(135deg, #b827dc 0%, #00d9ff 100%)',
        'gradient-alt': 'linear-gradient(135deg, #00d9ff 0%, #39ff14 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(184, 39, 220, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'glow': '0 0 30px rgba(0, 217, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
