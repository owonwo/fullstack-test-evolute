import { ofetch } from "ofetch";
import { Env } from "~/config/app";

export const fetch = ofetch.create({
  baseURL: Env.apiUrl,
});
