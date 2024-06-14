create table
  public.tiket (
    id uuid not null default gen_random_uuid (),
    acara_id uuid not null,
    nama_lengkap character varying(100) not null,
    kelas character varying(50) not null,
    email character varying(100) not null,
    nomor_telepon character varying(15) not null,
    sumber_info character varying(100) not null,
    status public.status_tiket not null default 'menunggu'::status_tiket,
    tanggal_dibuat timestamp with time zone not null default now(),
    constraint pendaftaran_pkey primary key (id),
    constraint pendaftaran_acara_id_fkey foreign key (acara_id) references acara (id)
  ) tablespace pg_default;