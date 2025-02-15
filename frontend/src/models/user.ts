/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface BaseSchema {
  id?: string | null;
  created_at?: string;
  updated_at?: string;
}
export interface User {
  id?: string | null;
  created_at?: string;
  updated_at?: string;
  email: string;
  provider?: string | null;
  display_name?: string | null;
  photo_url?: string | null;
}
