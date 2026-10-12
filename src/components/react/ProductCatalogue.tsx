import { useMemo, useState } from 'react';

export interface CatalogueProduct {
  id: string;
  name: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  shortDescription?: string;
  availability?: string;
  growingMethod?: string;
  suitableFor?: string[];
  imageUrl?: string;
  imageAlt?: string;
}

interface Props {
  products: CatalogueProduct[];
  categories: { title: string; slug: string }[];
}

function initialParam(name: string) {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(name) ?? '';
}

export default function ProductCatalogue({ products, categories }: Props) {
  const [search, setSearch] = useState(() => initialParam('search'));
  const [category, setCategory] = useState(() => initialParam('category'));
  const [availability, setAvailability] = useState(() => initialParam('availability'));
  const [growingMethod, setGrowingMethod] = useState(() => initialParam('growing'));

  const updateUrl = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  };

  const filteredProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return products.filter((product) => {
      const searchable = [
        product.name,
        product.category,
        product.shortDescription,
        product.growingMethod,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return (
        (!needle || searchable.includes(needle)) &&
        (!category || product.categorySlug === category) &&
        (!availability || product.availability === availability) &&
        (!growingMethod || product.growingMethod === growingMethod)
      );
    });
  }, [availability, category, growingMethod, products, search]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setAvailability('');
    setGrowingMethod('');
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div>
      <div className="grid gap-4 border-y border-line py-6 md:grid-cols-4">
        <label className="md:col-span-2">
          <span className="mb-2 block text-xs font-bold tracking-[0.1em] uppercase">
            Search produce
          </span>
          <input
            className="field"
            type="search"
            value={search}
            placeholder="Name, category, or attribute"
            onChange={(event) => {
              setSearch(event.target.value);
              updateUrl({ search: event.target.value });
            }}
          />
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold tracking-[0.1em] uppercase">
            Category
          </span>
          <select
            className="field"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              updateUrl({ category: event.target.value });
            }}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.title}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold tracking-[0.1em] uppercase">
            Availability
          </span>
          <select
            className="field"
            value={availability}
            onChange={(event) => {
              setAvailability(event.target.value);
              updateUrl({ availability: event.target.value });
            }}
          >
            <option value="">Any availability</option>
            <option value="available-now">Available now</option>
            <option value="seasonal">Seasonal</option>
            <option value="enquire">Enquire</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span>Growing method</span>
            <select
              className="border-b border-line bg-transparent py-2"
              value={growingMethod}
              onChange={(event) => {
                setGrowingMethod(event.target.value);
                updateUrl({ growing: event.target.value });
              }}
            >
              <option value="">Any</option>
              <option value="hydroponic">Hydroponic</option>
              <option value="soil-grown">Soil-grown</option>
              <option value="other">Other</option>
            </select>
          </label>
          <button type="button" className="text-sm font-bold underline" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group grid content-start">
              <a href={`/products/${product.slug}`} className="block overflow-hidden no-underline">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt || product.name}
                    width={720}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/5] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`Image pending — ${product.name}`}
                    className="relative grid aspect-[4/5] overflow-hidden bg-sage p-5 text-botanical-deep"
                  >
                    <div aria-hidden="true" className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-current/25" />
                    <span className="relative mt-auto text-[0.65rem] font-bold tracking-[0.14em] uppercase opacity-75">
                      Image pending — {product.name}
                    </span>
                  </div>
                )}
              </a>
              <div className="border-b border-line py-5">
                <p className="eyebrow">{product.category || 'Specialty produce'}</p>
                <h2 className="mt-2 font-display text-3xl leading-none">
                  <a className="no-underline" href={`/products/${product.slug}`}>{product.name}</a>
                </h2>
                {product.shortDescription && (
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">
                    {product.shortDescription}
                  </p>
                )}
                <a className="text-link mt-5 text-sm" href={`/products/${product.slug}`}>View Product</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 border-y border-line py-16 text-center">
          <h2 className="text-4xl">No matching produce found.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
            Try another category or search term, or ask our wholesale team about a specific requirement.
          </p>
          <a className="button button-primary mt-7" href="/request-a-quote">Enquire with our team</a>
        </div>
      )}
    </div>
  );
}
