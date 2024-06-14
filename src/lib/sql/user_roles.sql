create table
  public.user_roles (
    user_id uuid not null,
    role public.app_roles not null default 'user'::app_roles,
    created_at timestamp with time zone not null default now(),
    constraint user_roles_pkey primary key (user_id),
    constraint user_roles_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;