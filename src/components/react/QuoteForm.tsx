import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SubmitEvent,
} from 'react';
import {
  businessTypes,
  type BusinessType,
  type QuoteApiResponse,
  type QuoteField,
  type QuoteSubmission,
} from '@/types/quote';

const businessTypeLabels: Record<BusinessType, string> = {
  restaurant: 'Restaurant',
  'hotel-hospitality': 'Hotel or hospitality group',
  retailer: 'Retailer',
  'reseller-distributor': 'Reseller or distributor',
  other: 'Other professional buyer',
};

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'submitting'; message: string }
  | { status: 'error'; message: string }
  | { status: 'success'; message: string };

const initialState: FormState = { status: 'idle', message: '' };

function optionalValue(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' && value ? value : undefined;
}

interface FieldProps {
  name: QuoteField;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ name, label, required = false, error, children }: FieldProps) {
  const helpId = `${name}-error`;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium" htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-accent" id={helpId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClassName =
  'w-full border border-line bg-canvas px-4 py-3 text-charcoal outline-none transition-colors focus:border-botanical focus:ring-2 focus:ring-botanical/20 disabled:opacity-60';

export default function QuoteForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<QuoteField, string>>
  >({});
  const formStartedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const requestedProduct = new URLSearchParams(window.location.search).get('product');
    if (requestedProduct && productsRef.current && !productsRef.current.value) {
      productsRef.current.value = requestedProduct;
    }
  }, []);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: 'submitting', message: 'Sending your enquiry…' });
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const businessType = optionalValue(formData, 'businessType') as
      | BusinessType
      | undefined;

    const payload: QuoteSubmission = {
      name: String(formData.get('name') || ''),
      company: String(formData.get('company') || ''),
      email: String(formData.get('email') || ''),
      phone: optionalValue(formData, 'phone'),
      businessType,
      productsOfInterest: optionalValue(formData, 'productsOfInterest'),
      quantityRequirement: optionalValue(formData, 'quantityRequirement'),
      deliveryLocation: optionalValue(formData, 'deliveryLocation'),
      message: optionalValue(formData, 'message'),
      website: optionalValue(formData, 'website'),
      formStartedAt: formStartedAt.current,
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as QuoteApiResponse;

      if (!response.ok || !result.ok) {
        const errors = result.ok ? {} : (result.fieldErrors ?? {});
        setFieldErrors(errors);
        setState({
          status: 'error',
          message: result.message || 'We could not send your enquiry. Please try again.',
        });

        const firstInvalidField = Object.keys(errors)[0];
        if (firstInvalidField) {
          requestAnimationFrame(() => {
            const field = form.elements.namedItem(firstInvalidField);
            if (field instanceof HTMLElement) field.focus();
          });
        }
        return;
      }

      form.reset();
      formStartedAt.current = Date.now();
      setState({ status: 'success', message: result.message });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setState({
        status: 'error',
        message: 'We could not send your enquiry. Please try again.',
      });
    }
  }

  const describedBy = (name: QuoteField) =>
    fieldErrors[name] ? `${name}-error` : undefined;

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-busy={state.status === 'submitting'}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Your name" required error={fieldErrors.name}>
          <input
            className={controlClassName}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={describedBy('name')}
          />
        </Field>

        <Field name="company" label="Company" required error={fieldErrors.company}>
          <input
            className={controlClassName}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={150}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={describedBy('company')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="email" label="Work email" required error={fieldErrors.email}>
          <input
            className={controlClassName}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={describedBy('email')}
          />
        </Field>

        <Field name="phone" label="Phone" error={fieldErrors.phone}>
          <input
            className={controlClassName}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={describedBy('phone')}
          />
        </Field>
      </div>

      <Field
        name="businessType"
        label="Business type"
        error={fieldErrors.businessType}
      >
        <select
          className={controlClassName}
          id="businessType"
          name="businessType"
          aria-invalid={Boolean(fieldErrors.businessType)}
          aria-describedby={describedBy('businessType')}
          defaultValue=""
        >
          <option value="">Select an option</option>
          {businessTypes.map((businessType) => (
            <option key={businessType} value={businessType}>
              {businessTypeLabels[businessType]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        name="productsOfInterest"
        label="Products of interest"
        error={fieldErrors.productsOfInterest}
      >
        <textarea
          ref={productsRef}
          className={controlClassName}
          id="productsOfInterest"
          name="productsOfInterest"
          rows={3}
          maxLength={500}
          aria-invalid={Boolean(fieldErrors.productsOfInterest)}
          aria-describedby={describedBy('productsOfInterest')}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="quantityRequirement"
          label="Quantity or requirement"
          error={fieldErrors.quantityRequirement}
        >
          <textarea
            className={controlClassName}
            id="quantityRequirement"
            name="quantityRequirement"
            rows={3}
            maxLength={500}
            aria-invalid={Boolean(fieldErrors.quantityRequirement)}
            aria-describedby={describedBy('quantityRequirement')}
          />
        </Field>

        <Field
          name="deliveryLocation"
          label="Delivery location"
          error={fieldErrors.deliveryLocation}
        >
          <textarea
            className={controlClassName}
            id="deliveryLocation"
            name="deliveryLocation"
            autoComplete="street-address"
            rows={3}
            maxLength={200}
            aria-invalid={Boolean(fieldErrors.deliveryLocation)}
            aria-describedby={describedBy('deliveryLocation')}
          />
        </Field>
      </div>

      <Field name="message" label="Anything else we should know?" error={fieldErrors.message}>
        <textarea
          className={controlClassName}
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={describedBy('message')}
        />
      </Field>

      <div className="fixed left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          aria-hidden="true"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div
        ref={statusRef}
        className={
          state.status === 'error'
            ? 'border-l-2 border-accent pl-4 text-sm text-accent'
            : state.status === 'success'
              ? 'border-l-2 border-botanical pl-4 text-sm text-botanical'
              : 'text-sm text-muted'
        }
        role={state.status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        tabIndex={state.status === 'success' ? -1 : undefined}
      >
        {state.message}
      </div>

      <button
        className="inline-flex min-h-12 items-center justify-center bg-botanical px-6 py-3 font-medium text-canvas transition-colors hover:bg-botanical-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-botanical disabled:cursor-wait disabled:opacity-65"
        type="submit"
        disabled={state.status === 'submitting'}
      >
        {state.status === 'submitting' ? 'Sending…' : 'Send quote request'}
      </button>
    </form>
  );
}
