export interface Gallery {
  id: number;
  gallery_title: string;
  menu_title: string | null;
  gallery_description: string;
  image_position: 'top' | 'center' | 'bottom' | 'left' | 'right' | null;
  image_count: number;
}
