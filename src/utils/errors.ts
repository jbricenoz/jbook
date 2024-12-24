export const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    // Handle Supabase auth errors
    if ('message' in error) {
      switch ((error as any).message) {
        case 'Invalid login credentials':
          return 'Invalid email or password';
        case 'Email not confirmed':
          return 'Please check your email to confirm your account';
        default:
          return (error as any).message;
      }
    }
  }
  return 'An unexpected error occurred';
};