import { useEffect } from 'react';

const DEFAULT_TITLE = 'Ranbeer Chaudhary — Art Portfolio';

/** Sets the document title for the page (restored on unmount). */
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};

export default usePageTitle;
