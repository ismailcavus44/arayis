import Breadcrumb, { type BreadcrumbTrailItem } from './Breadcrumb'

interface PageHeroProps {
  title: string;
  description: string;
  variant?: 'primary' | 'blue';
  showBreadcrumb?: boolean;
  currentPage?: string;
  breadcrumbTrail?: BreadcrumbTrailItem[];
}

export default function PageHero({ title, description, variant = 'primary', showBreadcrumb = false, currentPage, breadcrumbTrail }: PageHeroProps) {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-50 via-white to-blue-50';
      case 'primary':
      default:
        return 'bg-gradient-to-br from-primary/10 via-white to-secondary/10';
    }
  };

  return (
    <section className={`${getBackgroundClass()} py-8`}>
      <div className="container mx-auto px-4">
        {showBreadcrumb && currentPage && (
          <Breadcrumb currentPage={currentPage} items={breadcrumbTrail} />
        )}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
