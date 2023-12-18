import { useAsyncLoader } from "~/hooks/use-async-loader";
import { CreateSurveyPayload, Survey } from "~/types/interfaces";
import { fetch } from "~/libs/api";

export function useCreateSurvey() {
  const { loading, attachLoader } = useAsyncLoader({ creating: false });

  const mutateAsync = attachLoader(
    "creating",
    async (body: CreateSurveyPayload) => {
      try {
        const res = await fetch<{ data: Survey }>("/survey", {
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
