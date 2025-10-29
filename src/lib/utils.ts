// Helper function to get the correct asset path for GitHub Pages
export const getAssetPath = (path: string) => {
  // Only add basePath in production, not in development
  const basePath = process.env.NODE_ENV === 'production' ? '/next-js-futuristic' : '';
  return `${basePath}${path}`;
};
