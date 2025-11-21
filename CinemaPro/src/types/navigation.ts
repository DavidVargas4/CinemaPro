export type RootStackParamList = {
  Auth: undefined;
  Main: undefined; // Tab Navigator
  Details: { movieId: string; title: string }; // Detalles de la película
  Booking: { movieTitle: string };
  Snacks: undefined;
};
