import { client } from "~/libs/api";
import { useQuery } from "react-query";
import { SuccessPayload, Survey } from "~/types/interfaces";

export function useGetSurvey(survey_id: string) {
  return useQuery({
    queryKey: ["survey", survey_id],
    queryFn: () =>
      client<SuccessPayload<Survey>>(`/survey/${survey_id}`).then((e) => {
        return e.success
          ? e.data
          : Promise.reject(
              new Error(
                "Unable to load survey. Something unexpected happened!",
              ),
            );
      }),
  });
}
