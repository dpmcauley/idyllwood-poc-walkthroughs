import { notFound } from 'next/navigation';
import { WALKTHROUGHS } from '@/data/walkthroughs';
import { PoCStepper } from '@/components/PoCStepper';

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(WALKTHROUGHS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { slug } = await params;
  const poc = WALKTHROUGHS[slug];

  if (!poc) {
    return {
      title: 'PoC Not Found',
    };
  }

  return {
    title: `${poc.title} | Idyllwood Lab PoC Walkthroughs`,
    description: poc.description,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const poc = WALKTHROUGHS[slug];

  if (!poc) {
    notFound();
  }

  return <PoCStepper poc={poc} />;
}
