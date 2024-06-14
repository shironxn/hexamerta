create table
  public.acara (
    id uuid not null default gen_random_uuid (),
    nama character varying(100) not null,
    deskripsi text not null,
    penyelenggara character varying(100) not null,
    lokasi character varying(255) not null,
    harga numeric(10, 2) not null,
    kapasitas integer not null,
    thumbnail_url character varying not null,
    poster_url character varying[] not null,
    tanggal_mulai timestamp with time zone not null,
    tanggal_selesai timestamp with time zone not null,
    tanggal_dibuat timestamp with time zone not null default now(),
    constraint acara_pkey primary key (id)
  ) tablespace pg_default;