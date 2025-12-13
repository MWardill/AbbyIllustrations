create schema if not exists app;

create table if not exists app.image_metadata (
  id int generated always as identity primary key,
  pathname text not null,
  alt text not null,
  about text,
  created_date date,
  updated_at timestamptz not null default now()
);

create unique index if not exists image_metadata_pathname_uidx
  on app.image_metadata (pathname);

insert into app.image_metadata (pathname, alt, about, created_date)
values
  ('/fashion-illustrations/Anna_Calvi.jpg', 'Anna_Calvi', null, null),
  ('/fashion-illustrations/Afro_Chique_Abby_Wright.jpg', 'Afro_Chique_Abby_Wright', null, null),
  ('/fashion-illustrations/C_is_for_Colour_Abby_Wright.jpg', 'C_is_for_Colour_Abby_Wright', null, null),
  ('/fashion-illustrations/Abby_Wright_Burberry_A-W_2011.jpg', 'Abby_Wright_Burberry_A-W_2011', null, null),
  ('/fashion-illustrations/Prophetik_2012_Abby_Wright.jpg', 'Prophetik_2012_Abby_Wright', null, null),
  ('/fashion-illustrations/Abby_Wright_Prophetik_A-W_2011_.jpg', 'Abby_Wright_Prophetik_A-W_2011_', null, null),
  ('/fashion-illustrations/KTZ_fashion_illo.jpg', 'KTZ_fashion_illo', null, null),
  ('/fashion-illustrations/Fashion_Abby_Wright_.jpg', 'Fashion_Abby_Wright_', null, null),
  ('/fashion-illustrations/Rachel_Freire_Abby_Wright_Fashion_Illustration_Illustrator.jpg', 'Rachel_Freire_Abby_Wright_Fashion_Illustration_Illustrator', null, null),
  ('/fashion-illustrations/Abby_Wright_Burberry_Bag_A_W.jpg', 'Abby_Wright_Burberry_Bag_A_W', null, null),
  ('/fashion-illustrations/natalie_portman.jpg', 'natalie_portman', null, null),
  ('/fashion-illustrations/Thomas_Illo.jpg', 'Thomas_Illo', null, null),
  ('/fashion-illustrations/Abby_Wright_Zine_Illustration.jpg', 'Abby_Wright_Zine_Illustration', null, null)
on conflict (pathname) do update
set
  alt = excluded.alt,
  about = excluded.about,
  created_date = excluded.created_date,
  updated_at = now();







