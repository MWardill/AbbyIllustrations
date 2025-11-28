import { ImageGallery } from '../../components/gallery';

const portraitPhotoModules = import.meta.glob('../../assets/portraits/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const portraitPhotos = Object.values(portraitPhotoModules) as string[];

export default function Portraits() {
    return (
        <ImageGallery title="Portraits" photos={portraitPhotos}>
            <p>A collection of portrait illustrations.</p>
        </ImageGallery>
    );
}
