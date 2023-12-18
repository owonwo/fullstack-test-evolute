import { client } from "~/libs/api";
import { useMutation, useQuery } from "react-query";
import {
  CreateSurveyPayload,
  SuccessPayload,
  Survey,
} from "~/types/interfaces";
import { useAsyncLoader } from "~/hooks/use-async-loader";

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

export function useCreateSurveyResponse(survey_id: string) {
  return useMutation({
    mutationKey: ["survey", "response"],
    mutationFn: (body: any) =>
      client("/survey/response", { method: "POST", body }),
  });
}

export function useCreateSurvey() {
  const { loading, attachLoader } = useAsyncLoader({ creating: false });

  const mutateAsync = attachLoader(
    "creating",
    async (body: CreateSurveyPayload) => {
      try {
        const res = await client<{ data: Survey }>("/survey", {
          method: "POST",
          body: body,
        });
        return res?.data;
      } catch (err: any) {
        const errorMsg =
          err.response?._data?.message || "Error creating survey";
        throw new Error(errorMsg);
      }
    },
  );

  return {
    isLoading: loading.creating,
    mutateAsync,
  };
}
