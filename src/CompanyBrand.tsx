import { House } from 'lucide-react';
import type { Company } from './dynamic/types';

export default function CompanyBrand({ company }: { company: Company }) {
  return <span className={`brand company-brand company-${company.toLowerCase()}`} aria-label={company === 'POMEMBAL' ? 'Pomembal' : 'Tradipom'}>
    {company === 'POMEMBAL'
      ? <span className="brand-apple" aria-hidden="true"><i /></span>
      : <House className="brand-house" aria-hidden="true" />}
    <span>{company === 'POMEMBAL' ? 'POMEMBAL' : 'TRADIPOM'}</span>
  </span>;
}
