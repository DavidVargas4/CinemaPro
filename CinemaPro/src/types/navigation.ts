export type RootStackParamList = {
  Auth: undefined;
  Main: undefined; // Tab Navigator
  Details: { movieId: string; title: string }; // Pasamos parámetros
  Booking: { movieTitle: string };
  Snacks: undefined;
};
