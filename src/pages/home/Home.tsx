import { Timeline, TimelineCard, TimelineNode } from '../../components/timeline';
import cincinatti from '../../assets/cincinatti/Cincinnati_Website_800.jpg';

// Observer images - glob import all images from the folder - I didn't like having like 8 imports per card
const observerImageModules = import.meta.glob<{ default: string }>(
    '../../assets/observer/*.jpg',
    { eager: true }
);

const observerImages = Object.entries(observerImageModules).map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop()?.replace('.jpg', '').replace(/_/g, ' ') ?? 'Observer image',
}));

// Company images
const companyImageModules = import.meta.glob<{ default: string }>(
    '../../assets/company/*.jpg',
    { eager: true }
);

const companyImages = Object.entries(companyImageModules).map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop()?.replace('.jpg', '').replace(/_/g, ' ') ?? 'Company image',
}));

// V&A images
const vaImageModules = import.meta.glob<{ default: string }>(
    '../../assets/v-and-a/*.{jpg,jpeg}',
    { eager: true }
);

const vaImages = Object.entries(vaImageModules)
    .map(([path, module]) => ({
        src: module.default,
        alt: path.split('/').pop()?.replace(/\.(jpg|jpeg)$/, '').replace(/_/g, ' ') ?? 'V&A image',
        filename: path.split('/').pop() ?? '',
    }))
    .sort((a, b) => {
        // Put DSCN files last
        const aIsDSCN = a.filename.startsWith('DSCN'); //this is a bit horrible but works for now
        const bIsDSCN = b.filename.startsWith('DSCN');
        if (aIsDSCN && !bIsDSCN) return 1;
        if (!aIsDSCN && bIsDSCN) return -1;
        return 0;
    });

const cincinattiImage = [{
    src: cincinatti,
    alt: 'Cincinatti'
}]

// Made images
const madeImageModules = import.meta.glob<{ default: string }>(
    '../../assets/made/*.jpg',
    { eager: true }
);

const madeImages = Object.entries(madeImageModules).map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop()?.replace('.jpg', '').replace(/_/g, ' ') ?? 'Made image',
}));

// Wedding images
const weddingImageModules = import.meta.glob<{ default: string }>(
    '../../assets/wedding/*.{jpg,jpeg,png}',
    { eager: true }
);

const weddingImages = Object.entries(weddingImageModules).map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop()?.replace(/\.(jpg|jpeg|png|JPG)$/, '').replace(/_/g, ' ') ?? 'Wedding image',
}));


const freckBlueModules = import.meta.glob<{ default: string }>(
    '../../assets/frecklesblue/*.jpg',
    { eager: true }
);

const freckBlueImages = Object.entries(freckBlueModules).map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop()?.replace('.jpg', '').replace(/_/g, ' ') ?? 'Made image',
}));


export default function Home() {
    return (
        <div className="min-h-[200vh] pb-50">
            <div className="text-center pt-4 pb-6">
                <h1 className="text-4xl font-bold mb-2">My Journey</h1>
                <div className="flex justify-center">
                    <div
                        className="h-1 w-64 bg-gray-300"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                        }}
                    />
                </div>
            </div>
            <Timeline>
                <TimelineNode
                    position="start"
                    year="1988"
                >
                    <div className="timeline-box">I was born</div>
                </TimelineNode>
                <TimelineNode
                    position="end"
                    year="2007"
                >
                    <div className="timeline-box">I studied Illustration at the University of Lincoln</div>
                </TimelineNode>
                <TimelineNode
                    position="start"
                    year="2011"
                >
                    <TimelineCard
                        images={vaImages}
                        title="V&A - Ultimate Yohji Illustration"
                        objectPosition='top'
                    >
                        <p>I was commissioned by the Victoria and Albert Museum to produce my 'Ultimate Yohji' illustration.</p>

                        <p className="mt-2"> My work, along with three others', was screen-printed onto tote bags at the Yohji Yamamoto at Play Friday Late event on the 27th May 2011. It was a dream commission!</p>

                        <p className="mt-2">As the illustration was produced with the intention of being screen-printed, I worked in a single colour, with no texture, shading or facial features. In doing this I had to change my working process which was enjoyable and challenging at the same time. I found this useful as it enabled me to adapt my work for different client needs.</p>
                    </TimelineCard>
                </TimelineNode>
                <TimelineNode
                    position="end"
                    year="2012"
                >
                    <TimelineCard
                        images={observerImages}
                        title="The Observer Review: Books of the Year 2012."
                    >
                        <p>I was commissioned by The Observer to create an illustration that would accompany a round up of the best books of 2012. You can read the article online <a href="https://www.theguardian.com/books/2012/nov/25/books-of-the-year-2012" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">here.</a></p>
                        <p className="mt-2">I was asked to illustrate a young woman reading in a winter scene and told to make the piece visually cold. I loved the opportunity to experiment with background elements, something I usually steer clear of.</p>
                    </TimelineCard>
                </TimelineNode>
                <TimelineNode
                    position="start"
                >
                    <TimelineCard
                        images={cincinattiImage}
                        title="Cincinnati Magazine"
                    >
                        <p>I was commissioned by Cincinnati Magazine to create an illustration to accompany an article about a local gallery and a University drawing professor.</p>
                        <p className="mt-2">I loved working on a drawing within a drawing and exploring styles.</p>
                    </TimelineCard>
                </TimelineNode>
                <TimelineNode
                    position="end"
                    year="2016"
                >
                    <TimelineCard
                        images={weddingImages}
                        title="Wedding"
                        objectPosition='top'
                    >
                        <p>We got married! ❤️</p>
                    </TimelineCard>
                </TimelineNode>

                <TimelineNode
                    position="start"
                    year="2016"
                >
                    <TimelineCard
                        images={companyImages}
                        title="Company Magazine"
                        objectPosition='top'
                    >
                        <p>I was chosen as the winner of Company Magazine's High Street Edit fashion illustrator competition. As a result, my work was featured throughout the issue and can be seen here.</p>
                    </TimelineCard>
                </TimelineNode>

                <TimelineNode
                    position="end"
                >
                    <TimelineCard
                        images={madeImages}
                        title="MADE illustrations"
                    >
                        <p>Illustrations of jewellery company; MADE.</p>

                        <p className="mt-2">All made products are designed by influential designers, then sourced and created within disadvantaged communities across East Africa.

                            Following the principles of fair trade we train local artisans in new skills, providing fair wages and support at every level. Via this 'trade not aid' ethos we believe we can help break the cycle of poverty and empower the people who create our products.

                            The powerful concept behind made is the brainchild of Cristina Cisilino. Having spent many years in the world of fashion, Cristina's love of Africa, coupled with her belief in trade not aid, led her to join forces with partner Gerson Barnett. Together they have created an accessories brand with a conscience.

                            That brand is made - by the people for the people."</p>

                        <p className="mt-2">By off-setting the bright, bold and exciting pieces against neutral, raw and subtle colours, I hope that they become the main focus of the pieces.</p>
                    </TimelineCard>
                </TimelineNode>

                <TimelineNode
                    position="start"
                    year="2020"
                >
                    <TimelineCard                        
                        images={freckBlueImages}
                        title="Freckles and Blue"
                    >
                        <p>In 2020, I illustrated my largest piece yet. Freckles and Blue were commissioned for a 40th birthday present.</p>

                        <p className="mt-2">I worked more intricately than ever before and it took many hours of love, dedication and hard work to complete. It remains one of my favourite illustrations to date. We worked with a local arts printer to have it printed in A1 and it's now framed in the recipients’ living room, a special reminder of their beloved dogs.</p>                        
                    </TimelineCard>
                </TimelineNode>
            </Timeline>
        </div>
    )
}