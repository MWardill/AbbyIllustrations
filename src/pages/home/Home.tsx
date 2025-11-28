import { Carousel } from '../../components/images';
import animalImg from '../../assets/animal-illustrations/piggy.jpeg';
import babyImg from '../../assets/baby-pictures/Baby_Girl_Website_700.jpg';
import christmasImg from '../../assets/christmas-animals/Rabbit_Card_Abby_Wright_600.jpg';
import dogImg from '../../assets/dog-pictures/Abby_Wardill_Dog_Illustration_Smaller_1000.jpg';
import fashionImg from '../../assets/fashion-illustrations/Anna_Calvi.jpg';

export default function Home() {         
    return (
        <div className="flex flex-col items-center py-8 px-4">
            <Carousel images={[
                { src: dogImg, alt: "Dog Illustration", eager: true },
                { src: babyImg, alt: "Baby Picture", eager: true }, 
                { src: fashionImg, alt: "Fashion Illustration", eager: true }, 
                { src: animalImg, alt: "Animal Illustration", eager: true }, 
                { src: christmasImg, alt: "Christmas Animal", eager: true }, 
            ]} />
        </div>
    )
}