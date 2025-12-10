export default function About() {
  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20">
      <div className="text-center pb-6">
        <h1 className="text-4xl font-bold mb-2">About Me</h1>
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

      <div className="space-y-4 text-lg">
        <p>My name is Abby Wright. I graduated in 2011 with First Class Honours in Illustration.</p>

        <p>I specialise in fashion and portrait illustration but also enjoy working to editorial briefs. More recently I have produced floral and food illustrations.</p>

        <p>My illustrations incorporate hand drawn line work with texture, colour and a careful combination of negative and positive space. I love working in a large format and creating fine details. It is this way of working that drew me to fashion illustration - I love being able to reproduce fashion in a true to life and intricate style.</p>

        <h2 className="text-2xl font-semibold pt-4">Clients/Published Work Includes:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>The Observer</li>
          <li>The Victoria and Albert Museum</li>
          <li>Company Magazine</li>
          <li>Midwives Magazine</li>
          <li>Arise Magazine</li>
          <li>Amelia&apos;s Compendium of Fashion Illustration</li>
          <li>Digital Arts Magazine</li>
        </ul>

        <p className="pt-4">I have also written a tutorial, entitled &apos;smarten up your fashion drawings&apos; for Digital Arts Magazine and had my work featured in the magazine twice previously. I have been featured with Tea & Crayons in Digital Artist.</p>

        <p>I am available for commissions and collaborations</p>
        <p>Please feel free to email me on <a href="mailto:abigail.wardill@gmail.com" className="text-primary hover:underline">abigail.wardill@gmail.com</a> / <a href="https://www.instagram.com/abbyillustrator/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram @abbyillustrator</a></p>
      </div>
    </div>
  )
}