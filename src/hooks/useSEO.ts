import { useEffect } from 'react';

/**
 * Simple SEO hook that sets document title and meta description
 */
const useSEO = (title?: string, description?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ElecMate`;
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);
};

export default useSEO;
