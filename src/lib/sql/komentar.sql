create table public.komentar (
    id uuid not null default gen_random_uuid (),
    acara_id uuid not null,
    nama character varying not null,
    pesan character varying not null,
    tanggal_dibuat timestamp
    with
        time zone not null default now(),
        constraint komentar_pkey primary key (id),
        constraint komentar_acara_id_fkey foreign key (acara_id) references acara (id)
) tablespace pg_default;