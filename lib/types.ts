export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  logo_url: string;
  first_name: string;
  last_name: string;
  bcba: string;
  about?: string | null;
  home_town?: string | null;
  current_city?: string | null;
  happy_place?: string | null;
  favorite_color?: string | null;
  favorite_hobby?: string | null;
  favorite_food?: string | null;
  is_public: boolean;
};

export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'logo_url' | 'bcba'> & {
  logo_url?: string;
  bcba?: string;
};

