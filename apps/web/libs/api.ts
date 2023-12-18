import { ofetch } from "ofetch";
import { Env } from "~/config/app";

export const client = ofetch.create({
  baseURL: Env.apiUrl,
});
