import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto pt-20 pb-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <div className="flex justify-center mb-6">
        <div
          className="h-1 w-64 bg-gray-300"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        />
      </div>
      <p className="text-xl mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}
