export type WordPressRenderedField = {
  rendered: string;
};

export type WordPressFeaturedMedia = {
  source_url?: string;
};

export type Villa = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  acf?: {
    suites?: number;
    location?: string;
  };
  _embedded?: {
    [key: string]: WordPressFeaturedMedia[];
  };
};

export type Retreat = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  acf?: {
    start_date?: string;
    end_date?: string;
    retreat_type?: string;
  };
};
