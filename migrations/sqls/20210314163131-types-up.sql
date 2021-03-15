CREATE TABLE  public.types (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  description TEXT NOT NULL
);
INSERT INTO public.types (description) VALUES('Income');
INSERT INTO public.types (description) VALUES('Outcome');
