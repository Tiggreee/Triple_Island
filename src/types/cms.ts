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

export type Package = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  acf?: {
    duration?: string;
    includes?: string;
    related_villa?: number;
    related_retreat?: number;
  };
};

export type Testimonial = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  acf?: {
    author_name?: string;
    author_role?: string;
    quote?: string;
    related_villa?: number;
    related_retreat?: number;
  };
};
