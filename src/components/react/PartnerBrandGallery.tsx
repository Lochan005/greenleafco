import PartnerBrandLogo from '@/components/react/PartnerBrandLogo';
import type { PartnerCategory, PartnerCategoryId } from '@/lib/content/partnerBrands';
import { partnerGridVisibleCount, partnerLogoSrc } from '@/lib/content/partnerBrands';
import {
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';

function readGalleryColumnCount(): number {
  if (typeof window === 'undefined') return 4;
  if (window.matchMedia('(min-width: 1280px)').matches) return 5;
  if (window.matchMedia('(min-width: 1024px)').matches) return 4;
  if (window.matchMedia('(min-width: 768px)').matches) return 3;
  return 2;
}

function subscribeGalleryColumnCount(onStoreChange: () => void): () => void {
  const queries = [
    window.matchMedia('(min-width: 1280px)'),
    window.matchMedia('(min-width: 1024px)'),
    window.matchMedia('(min-width: 768px)'),
  ];
  queries.forEach((query) => query.addEventListener('change', onStoreChange));
  return () => queries.forEach((query) => query.removeEventListener('change', onStoreChange));
}

function useGalleryColumnCount(): number {
  return useSyncExternalStore(
    subscribeGalleryColumnCount,
    readGalleryColumnCount,
    () => 4,
  );
}

function subscribeMinSm(onStoreChange: () => void): () => void {
  const query = window.matchMedia('(min-width: 640px)');
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

function useMinSmLayout(): boolean {
  return useSyncExternalStore(
    subscribeMinSm,
    () => window.matchMedia('(min-width: 640px)').matches,
    () => true,
  );
}

interface Props {
  categories: PartnerCategory[];
}

function categoryTabLabel(category: PartnerCategory): string {
  const count = category.brands.length;
  const noun = count === 1 ? 'business' : 'businesses';
  return `${category.title} — ${count} ${noun}`;
}

export default function PartnerBrandGallery({ categories }: Props) {
  const baseId = useId();
  const [activeCategoryId, setActiveCategoryId] = useState<PartnerCategoryId>(
    categories[0]?.id ?? 'hospitality',
  );
  const [hospitalityExpanded, setHospitalityExpanded] = useState(false);
  const [panelFaded, setPanelFaded] = useState(false);
  const categorySwitchTimeout = useRef<number | undefined>(undefined);
  const columnCount = useGalleryColumnCount();
  const isRowToggleLayout = useMinSmLayout();

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [activeCategoryId, categories],
  );

  const visibleBrands = useMemo(() => {
    if (!activeCategory) return [];
    const { brands, initialVisibleCount, id } = activeCategory;
    if (id === 'hospitality' && initialVisibleCount && !hospitalityExpanded) {
      const visibleCount = partnerGridVisibleCount(
        brands.length,
        initialVisibleCount,
        columnCount,
      );
      return brands.slice(0, visibleCount);
    }
    return brands;
  }, [activeCategory, columnCount, hospitalityExpanded]);

  const hospitalityCollapsedCount =
    activeCategory?.id === 'hospitality' && activeCategory.initialVisibleCount
      ? partnerGridVisibleCount(
          activeCategory.brands.length,
          activeCategory.initialVisibleCount,
          columnCount,
        )
      : 0;

  const showExpandControl =
    activeCategory?.id === 'hospitality' &&
    activeCategory.initialVisibleCount != null &&
    activeCategory.brands.length > hospitalityCollapsedCount &&
    !hospitalityExpanded;

  const selectCategory = (categoryId: PartnerCategoryId) => {
    if (categoryId === activeCategoryId) return;
    if (categorySwitchTimeout.current) {
      window.clearTimeout(categorySwitchTimeout.current);
    }
    setPanelFaded(true);
    categorySwitchTimeout.current = window.setTimeout(() => {
      setActiveCategoryId(categoryId);
      if (categoryId !== 'hospitality') {
        setHospitalityExpanded(false);
      }
      setPanelFaded(false);
      categorySwitchTimeout.current = undefined;
    }, 160);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = categories.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = lastIndex;
    }

    if (nextIndex == null) return;
    event.preventDefault();
    const nextCategory = categories[nextIndex];
    if (!nextCategory) return;
    selectCategory(nextCategory.id);
    document.getElementById(`${baseId}-tab-${nextCategory.id}`)?.focus();
  };

  if (!activeCategory) {
    return null;
  }

  const panelId = `${baseId}-panel-${activeCategory.id}`;
  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === activeCategoryId),
  );
  const toggleSegmentCount = categories.length;
  const toggleThumbTransform = isRowToggleLayout
    ? `translateX(calc(${activeIndex} * 100%))`
    : `translateY(calc(${activeIndex} * 100%))`;

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Partner categories"
        className="relative flex flex-col gap-px border border-line bg-line p-px sm:flex-row"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-px left-px z-0 bg-paper transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: toggleThumbTransform,
            width: isRowToggleLayout
              ? `calc((100% - 2px) / ${toggleSegmentCount})`
              : 'calc(100% - 2px)',
            height: isRowToggleLayout
              ? 'calc(100% - 2px)'
              : `calc((100% - 2px) / ${toggleSegmentCount})`,
          }}
        />
        {categories.map((category, index) => {
          const selected = category.id === activeCategoryId;
          const tabId = `${baseId}-tab-${category.id}`;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`relative z-10 min-h-11 flex-1 px-4 py-4 text-left text-sm leading-snug transition-colors duration-300 ease-out motion-reduce:transition-none ${
                selected
                  ? 'font-bold text-botanical'
                  : 'font-medium text-muted hover:text-charcoal'
              }`}
              onClick={() => selectCategory(category.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {categoryTabLabel(category)}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${baseId}-tab-${activeCategory.id}`}
        className={`pt-10 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          panelFaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="sr-only" aria-live="polite">
          Showing {visibleBrands.length} of {activeCategory.brands.length} partners in{' '}
          {activeCategory.title}.
        </p>
        <ul className="grid grid-cols-2 gap-px overflow-visible border border-line bg-line md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleBrands.map((brand) => (
            <li
              key={brand.id}
              className="group relative z-0 min-w-0 bg-canvas transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:z-20 hover:scale-[1.035] hover:shadow-[0_18px_40px_-22px_rgba(20,40,31,0.35)] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none max-[hover:none]:hover:scale-100 max-[hover:none]:hover:shadow-none"
            >
              <PartnerBrandLogo name={brand.name} logoSrc={partnerLogoSrc(brand.id)} />
            </li>
          ))}
        </ul>

        {showExpandControl && activeCategory.expandLabel && (
          <div className="mt-8 text-center">
            <button
              type="button"
              className="text-link border-0 bg-transparent p-0 font-bold tracking-normal normal-case"
              onClick={() => setHospitalityExpanded(true)}
            >
              {activeCategory.expandLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
