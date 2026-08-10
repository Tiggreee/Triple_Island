export type WordPressRenderedField = {
  rendered: string;
};

export type WordPressFeaturedMedia = {
  source_url?: string;
};

// Field names below match wordpress/plugins/cocob-core/cocob-core.php's
// register_post_meta calls exactly — these are native post_meta, exposed
// under `meta`, not ACF. Keep the two in sync; a mismatch here is silent
// (fields just come back undefined, nothing throws).
export type Villa = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  featured_media_url?: string | null;
  meta?: {
    suite_capacity?: number;
    min_stay_nights?: number;
    bedrooms?: number;
    bathrooms?: number;
    guest_capacity?: number;
    price_from?: number;
    location?: string;
    short_description?: string;
    long_description?: string;
    use_cases?: string[];
    gallery_urls?: string[];
  };
  _embedded?: {
    [key: string]: WordPressFeaturedMedia[];
  };
};

export type Retreat = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  featured_media_url?: string | null;
  meta?: {
    start_date?: string;
    end_date?: string;
    capacity?: number;
    spots_left?: number;
    retreat_type?: string;
    host_name?: string;
    indicative_price?: string;
    villa_id?: number;
  };
};

export type Package = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  meta?: {
    duration?: string;
    includes?: string[];
    villa_id?: number;
    retiro_id?: number;
  };
};

export type Testimonial = {
  id: number;
  slug: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  meta?: {
    author_name?: string;
    author_role?: string;
    author_photo_url?: string;
    villa_id?: number;
    retiro_id?: number;
  };
};
