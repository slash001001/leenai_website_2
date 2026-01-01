import Link from 'next/link';
import {Container} from '@/components/container';

export default function NotFound() {
  return (
    <section className="py-20">
      <Container className="space-y-4">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-brand-ink/80">The page you are looking for does not exist.</p>
        <Link href="/" className="text-brand-deepBlue underline">
          Go to home
        </Link>
      </Container>
    </section>
  );
}
