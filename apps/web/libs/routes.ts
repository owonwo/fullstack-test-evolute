export const Routes = {
  Survey(survey_id: string) {
    return `/survey/${survey_id}`;
  },
};

export const baseUrl = (path: string) => {
  return new URL(path, window.location.toString()).toString();
};
