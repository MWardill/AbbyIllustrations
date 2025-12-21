create schema if not exists app;

create table if not exists app.image_metadata (
  id int generated always as identity primary key,
  pathname text not null,
  alt text not null,
  about text,
  author text default 'Abigail Wright',
  created_date date,
  primary_image boolean default false,
  updated_at timestamptz not null default now()
);

create unique index if not exists image_metadata_pathname_uidx
  on app.image_metadata (pathname);

create table if not exists app.image_galleries (
  id int generated always as identity primary key,
  gallery_title text not null,
  menu_title text not null,
  gallery_description text not null,
  constraint image_galleries_gallery_title_uniq unique (gallery_title)
);

create type position as enum ('top', 'center', 'bottom', 'left', 'right');

alter table app.image_galleries add column if not exists image_position public.position null;


create table if not exists app.image_galleries_images (
    gallery_id int not null,
    image_id int not null,
    primary key (gallery_id, image_id)
);


do $$ 
begin
  if not exists (
    select 1 from information_schema.table_constraints 
    where table_schema = 'app' 
    and table_name = 'image_galleries_images' 
    and constraint_name = 'fk_gallery_id'
  ) then
    alter table app.image_galleries_images
      add constraint fk_gallery_id foreign key (gallery_id) references app.image_galleries (id) on delete cascade;
  end if;
end $$;

do $$ 
begin
  if not exists (
    select 1 from information_schema.table_constraints 
    where table_schema = 'app' 
    and table_name = 'image_galleries_images' 
    and constraint_name = 'fk_image_id'
  ) then
    alter table app.image_galleries_images
      add constraint fk_image_id foreign key (image_id) references app.image_metadata (id) on delete cascade;
  end if;
end $$;


  
insert into app.image_galleries (gallery_title, menu_title, gallery_description)
values
  ('fashion-illustrations', 'Fashion Illustrations', 'A collection of fashion illustrations featuring various designers and styles.')
on conflict do nothing;
    
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


insert into app.image_galleries_images (gallery_id, image_id)
select
  g.id,
  m.id
from app.image_galleries g
join app.image_metadata m on g.gallery_title = 'fashion-illustrations'
    and m.pathname like '/fashion-illustrations/%'  
on conflict (gallery_id, image_id) do nothing;
