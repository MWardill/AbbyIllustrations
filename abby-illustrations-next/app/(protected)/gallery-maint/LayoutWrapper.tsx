'use client';

import Layout from '@/src/components/layout/Layout';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Layout showCarousel={false}>
      {children}
    </Layout>
  );
}
