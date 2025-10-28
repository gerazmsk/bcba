export function validateProfileField(
  value: string | undefined | null,
  fieldName: string,
  maxLength?: number,
  required = false
): string | null {
  if (required && (!value || value.trim().length === 0)) {
    return `${fieldName} is required`;
  }

  if (value && maxLength && value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`;
  }

  return null;
}

export function sanitizeInput(input: string): string {
  // Remove potential HTML tags to prevent injection
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validateProfileForm(data: {
  first_name: string;
  last_name: string;
  about?: string | null;
  [key: string]: any;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const firstNameError = validateProfileField(data.first_name, 'First name', 100, true);
  if (firstNameError) errors.first_name = firstNameError;

  const lastNameError = validateProfileField(data.last_name, 'Last name', 100, true);
  if (lastNameError) errors.last_name = lastNameError;

  const aboutError = validateProfileField(data.about, 'About', 2000);
  if (aboutError) errors.about = aboutError;

  const homeTownError = validateProfileField(data.home_town, 'Home town', 100);
  if (homeTownError) errors.home_town = homeTownError;

  const currentCityError = validateProfileField(data.current_city, 'Current city', 100);
  if (currentCityError) errors.current_city = currentCityError;

  const happyPlaceError = validateProfileField(data.happy_place, 'Happy place', 100);
  if (happyPlaceError) errors.happy_place = happyPlaceError;

  const favoriteColorError = validateProfileField(data.favorite_color, 'Favorite color', 100);
  if (favoriteColorError) errors.favorite_color = favoriteColorError;

  const favoriteHobbyError = validateProfileField(data.favorite_hobby, 'Favorite hobby', 100);
  if (favoriteHobbyError) errors.favorite_hobby = favoriteHobbyError;

  const favoriteFoodError = validateProfileField(data.favorite_food, 'Favorite food', 100);
  if (favoriteFoodError) errors.favorite_food = favoriteFoodError;

  return errors;
}

