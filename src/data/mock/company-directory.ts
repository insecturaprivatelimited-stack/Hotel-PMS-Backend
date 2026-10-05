export type CompanyStatus = "Active" | "On Hold" | "Inactive";

export type CompanyAccount = {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  billingAddress: string;
  status: CompanyStatus;
  paymentTermsDays: number;
};

export const companyDirectory: CompanyAccount[] = [
  {
    id: "company-central-valley-ag",
    name: "Central Valley Ag Services",
    contactPerson: "Melissa Grant",
    phone: "(209) 555-0201",
    email: "billing@centralvalleyag.example",
    billingAddress: "1450 E. Pacheco Blvd., Los Banos, CA 93635",
    status: "Active",
    paymentTermsDays: 30,
  },
  {
    id: "company-caltrans-10",
    name: "Caltrans District 10",
    contactPerson: "Robert Sandoval",
    phone: "(209) 555-0202",
    email: "district10billing@example.gov",
    billingAddress: "1976 E. Dr. Martin Luther King Jr. Blvd., Stockton, CA 95205",
    status: "Active",
    paymentTermsDays: 30,
  },
  {
    id: "company-los-banos-unified",
    name: "Los Banos Unified School District",
    contactPerson: "Angela Torres",
    phone: "(209) 555-0203",
    email: "accounts.payable@lbusd.example",
    billingAddress: "1717 S. 11th St., Los Banos, CA 93635",
    status: "Active",
    paymentTermsDays: 30,
  },
  {
    id: "company-pacific-utility",
    name: "Pacific Utility Contractors",
    contactPerson: "Derek Coleman",
    phone: "(559) 555-0204",
    email: "ap@pacificutility.example",
    billingAddress: "8040 W. Nielsen Ave., Fresno, CA 93706",
    status: "Active",
    paymentTermsDays: 15,
  },
  {
    id: "company-valley-harvest",
    name: "Valley Harvest Logistics",
    contactPerson: "Monica Reyes",
    phone: "(209) 555-0205",
    email: "billing@valleyharvest.example",
    billingAddress: "2250 W. Highway 152, Los Banos, CA 93635",
    status: "On Hold",
    paymentTermsDays: 15,
  },
  {
    id: "company-westside-construction",
    name: "Westside Construction Group",
    contactPerson: "Paul Jensen",
    phone: "(408) 555-0206",
    email: "office@westsideconstruction.example",
    billingAddress: "901 Monterey Road, Gilroy, CA 95020",
    status: "Inactive",
    paymentTermsDays: 30,
  },
];

export function getCompanyAccountById(id: string) {
  return companyDirectory.find((company) => company.id === id);
}
