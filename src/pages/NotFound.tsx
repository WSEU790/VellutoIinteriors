import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for could not be found." path="/404" noindex />
      <section className="flex min-h-[80vh] items-center pt-32">
        <div className="container-site text-center">
          <p className="eyebrow">404</p>
          <div className="rule mx-auto my-6" />
          <h1 className="text-5xl sm:text-6xl">This room is still being designed.</h1>
          <p className="mx-auto mt-6 max-w-md text-ivory-muted">The page you requested could not be found. It may have moved, or the address may be incorrect.</p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/" className="btn-gold">Return Home</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
