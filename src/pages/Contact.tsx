import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { site } from '../data/site';
import { ApiError, submitLead } from '../lib/api';
import { ACCEPTED_IMAGE_TYPES, BUDGET_RANGES, LEAD_LIMITS, RENOVATION_TYPES, TIMELINES } from '../../server/src/domain/leadOptions';
import { breadcrumbSchema } from '../lib/schema';

const MAX_FILES = Number(import.meta.env.VITE_UPLOAD_MAX_FILES ?? 6);
const MAX_MB = Number(import.meta.env.VITE_UPLOAD_MAX_MB ?? 10);

type Fields = {
  name: string;
  email: string;
  phone: string;
  location: string;
  renovationType: string;
  budget: string;
  timeline: string;
  description: string;
  consent: boolean;
  website: string; // honeypot
};
type Errors = Partial<Record<keyof Fields | 'images', string>>;

const empty: Fields = { name: '', email: '', phone: '', location: '', renovationType: '', budget: '', timeline: '', description: '', consent: false, website: '' };

function validate(f: Fields, files: File[]): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) e.phone = 'Please enter a valid phone number, including area code.';
  if (f.location.trim().length < 5) e.location = 'Please enter the project address or ZIP code.';
  if (!f.renovationType) e.renovationType = 'Please select a renovation type.';
  if (!f.budget) e.budget = 'Please select an estimated budget.';
  if (!f.timeline) e.timeline = 'Please select a desired timeline.';
  const d = f.description.trim().length;
  if (d < LEAD_LIMITS.descriptionMin) e.description = `Please tell us a little more (at least ${LEAD_LIMITS.descriptionMin} characters).`;
  else if (d > LEAD_LIMITS.descriptionMax) e.description = `Please keep your description under ${LEAD_LIMITS.descriptionMax} characters.`;
  if (!f.consent) e.consent = 'Please confirm we may contact you about your project.';
  if (files.length > MAX_FILES) e.images = `Please attach no more than ${MAX_FILES} images.`;
  else if (files.some((x) => x.size > MAX_MB * 1024 * 1024)) e.images = `Each image must be under ${MAX_MB} MB.`;
  else if (files.some((x) => !(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(x.type))) e.images = 'Please upload JPG, PNG, WEBP or HEIC images only.';
  return e;
}

export default function Contact() {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>(() => {
    const svc = params.get('service');
    const match = RENOVATION_TYPES.find((t) => t === svc);
    return { ...empty, renovationType: match ?? '' };
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const [reference, setReference] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const previews = useMemo(() => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  useEffect(() => {
    if (touched) setErrors(validate(fields, files));
  }, [fields, files, touched]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFields((f) => ({ ...f, [k]: v }));
  };

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked].slice(0, MAX_FILES + 1));
    e.target.value = '';
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const v = validate(fields, files);
    setErrors(v);
    if (Object.keys(v).length) {
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus('submitting');
    setServerMsg('');
    const fd = new FormData();
    (Object.keys(fields) as (keyof Fields)[]).forEach((k) => fd.append(k, String(fields[k])));
    files.forEach((f) => fd.append('images', f));
    try {
      const res = await submitLead(fd);
      setReference(res.id);
      setStatus('success');
      setFields(empty);
      setFiles([]);
      setTouched(false);
    } catch (err) {
      const apiErr = err instanceof ApiError ? err : new ApiError('Something went wrong. Please try again.', 0);
      if (apiErr.fieldErrors) setErrors(apiErr.fieldErrors as Errors);
      setServerMsg(apiErr.message);
      setStatus('error');
    }
  };

  const errorList = Object.entries(errors).filter(([, v]) => v);
  const fieldProps = (k: keyof Fields) => ({
    id: k,
    name: k,
    'aria-invalid': !!errors[k] || undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });
  const Err = ({ k }: { k: keyof Errors }) => (errors[k] ? <p id={`${k}-error`} className="mt-2 text-xs text-[#e0a58a]">{errors[k]}</p> : null);

  return (
    <>
      <Seo title="Request a Consultation — Velluto Interiors" description="Request a private design consultation for luxury kitchen remodeling, custom cabinetry or interior renovation in Boca Raton, Fort Lauderdale, Pompano Beach and Palm Beach." path="/contact" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <section className="pb-24 pt-40 sm:pb-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Request a Consultation</p>
            <div className="rule my-6" />
            <h1 className="text-5xl leading-[1.05] sm:text-6xl">Let’s begin with a conversation.</h1>
            <p className="mt-6 leading-relaxed text-ivory-muted">Tell us about your home and your plans. A member of our design team will review your request and contact you to arrange a private consultation.</p>
            <div className="mt-10 space-y-6 border-t border-ivory/10 pt-8 text-sm">
              <div>
                <p className="eyebrow !text-[0.6rem]">What happens next</p>
                <ol className="mt-4 space-y-3 text-ivory-muted">
                  <li><span className="mr-3 font-serif text-gold">I</span>We review your project details and images.</li>
                  <li><span className="mr-3 font-serif text-gold">II</span>We contact you to discuss scope and schedule.</li>
                  <li><span className="mr-3 font-serif text-gold">III</span>We meet for an in-home design consultation.</li>
                </ol>
              </div>
              {(site.phone || site.email) && (
                <div className="space-y-2 text-ivory-muted">
                  <p className="eyebrow !text-[0.6rem]">Direct contact</p>
                  {site.phone && <p><a className="link-underline" href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a></p>}
                  {site.email && <p><a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a></p>}
                </div>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            {status === 'success' ? (
              <div ref={successRef} tabIndex={-1} role="status" className="border border-gold/40 bg-onyx-800 p-10 outline-none sm:p-14">
                <p className="eyebrow">Request received</p>
                <h2 className="mt-6 text-4xl">Thank you.</h2>
                <p className="mt-6 leading-relaxed text-ivory-muted">Your consultation request has been received and saved. A member of our team will be in touch to arrange next steps.</p>
                {reference && <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory-dim">Reference: <span className="text-ivory-muted">{reference}</span></p>}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link to="/portfolio" className="btn-outline">Explore the Portfolio</Link>
                  <button type="button" className="btn-outline" onClick={() => setStatus('idle')}>Submit another request</button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-10" aria-describedby="form-note">
                {touched && errorList.length > 0 && (
                  <div ref={summaryRef} tabIndex={-1} role="alert" className="border border-[#e0a58a]/50 p-5 text-sm text-[#e0a58a] outline-none">
                    <p>Please review the {errorList.length === 1 ? 'highlighted field' : `${errorList.length} highlighted fields`} below.</p>
                  </div>
                )}
                {status === 'error' && serverMsg && (
                  <div role="alert" className="border border-[#e0a58a]/50 p-5 text-sm text-[#e0a58a]">{serverMsg}</div>
                )}

                <fieldset className="grid gap-8 sm:grid-cols-2">
                  <legend className="eyebrow mb-8">Your details</legend>
                  <div>
                    <label htmlFor="name" className="field-label">Full name *</label>
                    <input {...fieldProps('name')} className="field" autoComplete="name" value={fields.name} onChange={set('name')} maxLength={LEAD_LIMITS.nameMax} />
                    <Err k="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">Email *</label>
                    <input {...fieldProps('email')} type="email" className="field" autoComplete="email" value={fields.email} onChange={set('email')} maxLength={LEAD_LIMITS.emailMax} />
                    <Err k="email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="field-label">Phone *</label>
                    <input {...fieldProps('phone')} type="tel" className="field" autoComplete="tel" value={fields.phone} onChange={set('phone')} maxLength={LEAD_LIMITS.phoneMax} />
                    <Err k="phone" />
                  </div>
                  <div>
                    <label htmlFor="location" className="field-label">Project address or ZIP *</label>
                    <input {...fieldProps('location')} className="field" autoComplete="street-address" value={fields.location} onChange={set('location')} maxLength={LEAD_LIMITS.addressMax} />
                    <Err k="location" />
                  </div>
                </fieldset>

                <fieldset className="grid gap-8 sm:grid-cols-3">
                  <legend className="eyebrow mb-8">Your project</legend>
                  <div className="sm:col-span-3">
                    <label htmlFor="renovationType" className="field-label">Type of renovation *</label>
                    <select {...fieldProps('renovationType')} className="field" value={fields.renovationType} onChange={set('renovationType')}>
                      <option value="">Select…</option>
                      {RENOVATION_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <Err k="renovationType" />
                  </div>
                  <div className="sm:col-span-3 grid gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="budget" className="field-label">Estimated budget *</label>
                      <select {...fieldProps('budget')} className="field" value={fields.budget} onChange={set('budget')}>
                        <option value="">Select…</option>
                        {BUDGET_RANGES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <Err k="budget" />
                    </div>
                    <div>
                      <label htmlFor="timeline" className="field-label">Desired timeline *</label>
                      <select {...fieldProps('timeline')} className="field" value={fields.timeline} onChange={set('timeline')}>
                        <option value="">Select…</option>
                        {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <Err k="timeline" />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="description" className="field-label">Project description *</label>
                    <textarea {...fieldProps('description')} rows={5} className="field resize-y" value={fields.description} onChange={set('description')} placeholder="The rooms involved, what you would like to change, style preferences…" />
                    <div className="mt-1 flex justify-between gap-4">
                      <Err k="description" />
                      <span className="ml-auto mt-2 text-[0.65rem] text-ivory-dim">{fields.description.trim().length}/{LEAD_LIMITS.descriptionMax}</span>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="eyebrow mb-4">Photos of your space <span className="normal-case tracking-normal text-ivory-dim">(optional)</span></legend>
                  <p className="mb-4 text-xs text-ivory-dim">Up to {MAX_FILES} images · JPG, PNG, WEBP or HEIC · {MAX_MB} MB each</p>
                  <label htmlFor="images" className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-ivory/25 px-6 py-10 text-center transition-colors hover:border-gold focus-within:border-gold">
                    <span className="text-[0.7rem] uppercase tracking-[0.24em] text-gold">Choose images</span>
                    <span className="mt-2 text-xs text-ivory-dim">or tap to use your camera on mobile</span>
                    <input ref={fileInput} id="images" name="images" type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} multiple className="sr-only" onChange={onFiles} aria-describedby={errors.images ? 'images-error' : undefined} />
                  </label>
                  <Err k="images" />
                  {previews.length > 0 && (
                    <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {previews.map((p, i) => (
                        <li key={p.url} className="group relative aspect-square overflow-hidden bg-onyx-700">
                          <img src={p.url} alt={`Selected upload ${i + 1}: ${p.name}`} className="h-full w-full object-cover" />
                          <button type="button" onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))} className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-onyx/85 text-ivory hover:text-gold" aria-label={`Remove ${p.name}`}>×</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </fieldset>

                {/* Honeypot — hidden from people, catches bots */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
                </div>

                <div>
                  <label className="flex items-start gap-4 text-sm leading-relaxed text-ivory-muted">
                    <input {...fieldProps('consent')} type="checkbox" checked={fields.consent} onChange={set('consent')} className="mt-1 h-4 w-4 shrink-0 accent-[#b89a64]" />
                    <span>I agree that Velluto Interiors may contact me by email or phone about this project. My information will not be sold or shared with third parties for marketing.</span>
                  </label>
                  <Err k="consent" />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button type="submit" disabled={status === 'submitting'} className="btn-gold disabled:cursor-wait disabled:opacity-60">
                    {status === 'submitting' ? 'Sending…' : 'Submit Request'}
                  </button>
                  <p id="form-note" className="text-xs text-ivory-dim">Fields marked * are required.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
