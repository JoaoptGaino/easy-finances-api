CREATE TABLE public.transction (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  description TEXT NOT NULL,
  value DECIMAL NOT NULL,
  type_id INT4 NOT NULL,
  CONSTRAINT type_fkey FOREIGN KEY(type_id) REFERENCES types(id)
)