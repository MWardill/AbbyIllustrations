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

export default function Home() {
    return (
        <div className="min-h-[200vh]">
            <Timeline>
                {(activeIndex) => (
                    <>
                        <TimelineNode
                            isActive={activeIndex >= 0}
                            position="start"
                            year="2011"
                            isFirst
                        >
                            <TimelineCard
                                images={observerImages}
                                title="The Observer Review: Books of the Year 2012."
                            >
                                <p>I was commissioned by The Observer to create an illustration that would accompany a round up of the best books of 2012. You can read the article online here.</p>
                                <p className="mt-2">I was asked to illustrate a young woman reading in a winter scene and told to make the piece visually cold. I loved the opportunity to experiment with background elements, something I usually steer clear of.</p>
                            </TimelineCard>
                        </TimelineNode>
                        <TimelineNode
                            isActive={activeIndex >= 1}
                            position="end"
                        >
                            <TimelineCard
                                images={cincinattiImage}
                                title="Cincinnati Magazine"
                            >
                                <p>I was commissioned by Cincinnati Magazine to create an illustration to accompany an article about a local gallery and a University drawing professor.

                                    I loved working on a drawing within a drawing and exploring styles.</p>
                            </TimelineCard>
                        </TimelineNode>
                        <TimelineNode
                            isActive={activeIndex >= 2}
                            position="start"
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
                            isActive={activeIndex >= 3}
                            position="end"
                        >
                            <TimelineCard
                                images={vaImages}
                                title="V&A - Ultimate Yohji Illustration"
                                objectPosition='top'
                            >
                                <p>I was commissioned by the Victoria and Albert Museum to produce my 'Ultimate Yohji' illustration.

                                    My work, along with three others', was screen-printed onto tote bags at the Yohji Yamamoto at Play Friday Late event on the 27th May 2011. It was a dream commission!

                                    As the illustration was produced with the intention of being screen-printed, I worked in a single colour, with no texture, shading or facial features. In doing this I had to change my working process which was enjoyable and challenging at the same time. I found this useful as it enabled me to adapt my work for different client needs.</p>
                            </TimelineCard>
                        </TimelineNode>
                        <TimelineNode
                            isActive={activeIndex >= 4}
                            position="start"
                            isLast
                        >
                            <TimelineCard
                                images={madeImages}
                                title="MADE illustrations"
                            >
                                <p>Illustrations of jewellery company; MADE.

                                    "All made products are designed by influential designers, then sourced and created within disadvantaged communities across East Africa.

                                    Following the principles of fair trade we train local artisans in new skills, providing fair wages and support at every level. Via this 'trade not aid' ethos we believe we can help break the cycle of poverty and empower the people who create our products.

                                    The powerful concept behind made is the brainchild of Cristina Cisilino. Having spent many years in the world of fashion, Cristina's love of Africa, coupled with her belief in trade not aid, led her to join forces with partner Gerson Barnett. Together they have created an accessories brand with a conscience.

                                    That brand is made - by the people for the people."

                                    By off-setting the bright, bold and exciting pieces against neutral, raw and subtle colours, I hope that they become the main focus of the pieces.</p>
                            </TimelineCard>
                        </TimelineNode>
                    </>
                )}
            </Timeline>
        </div>
    )
}