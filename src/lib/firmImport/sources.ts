/**
 * ELE-2067 — what each system's exports look like, and how to get them.
 *
 * None of these vendors publishes the column list of its own export files.
 * The aliases come from what each vendor does publish (import templates,
 * which Simpro, Tradify and Commusoft say are the same columns their exports
 * use; report field lists; API field names), plus the usual variants. The
 * wizard always shows the column match before anything is imported, so a
 * column we guessed wrong is one tap to fix. Sources, read 10 Oct 2026:
 *
 * Tradify   https://help.tradifyhq.com/hc/en-us/articles/4402065079705-Exporting-Or-Deleting-Your-Data-From-Tradify
 *           https://help.tradifyhq.com/hc/en-us/articles/4587909820185-Import-Customers-Into-Tradify
 *           https://help.tradifyhq.com/hc/en-us/articles/360026628974-How-to-Import-Historical-Jobs-Into-Tradify
 *           https://help.tradifyhq.com/hc/en-us/articles/360016148714-How-To-Import-a-Supplier-Price-List
 * Fergus    https://help.fergus.com/en/articles/10698848-customer-invoice-report
 *           https://help.fergus.com/en/articles/10172627-upload-a-custom-csv-price-book
 *           https://help.fergus.com/en/articles/415333-importing-customers
 * Powered Now https://support.powerednow.com/en/knowledge/how-do-i-export-my-contacts
 *           https://support.powerednow.com/en/knowledge/-how-do-i-export-my-financial-data
 *           https://support.powerednow.com/en/knowledge/accounts-export-status-column
 * simPRO    https://helpguide.simprogroup.com/articles/#!help-guide/import-templates
 *           https://helpguide.simprogroup.com/articles/#!help-guide/export-customers
 * ServiceM8 https://support.servicem8.com/help-center/tips-trick-more/more/how-to-download-a-backup-of-your-servicem8-data
 *           https://developer.servicem8.com/reference/getjobs.md
 * Jobber    https://help.getjobber.com/en/articles/export-client-information/
 *           https://help.getjobber.com/en/articles/import-quotes/
 *           https://help.getjobber.com/en/articles/import-invoices/
 * Commusoft https://help.commusoft.com/en/articles/216447-how-to-import-your-customers
 *           https://help.commusoft.com/en/articles/471416-how-does-commusoft-handle-data-exports-to-excel-based-on-file-size
 * Joblogic  https://support.joblogic.com/docs/dynamic-reports
 *           https://support.joblogic.com/docs/importing-jobs
 */
import type { ColumnMap, ImportKind, ParsedFile, SourceSystem } from './types';
import { KIND_FIELDS } from './types';
import type { DateOrder } from './normalise';

export interface SourceInfo {
  key: SourceSystem;
  label: string;
  /** Plain steps for getting the files out. */
  steps: string[];
  helpUrl?: string;
  dateOrder: DateOrder;
  /** Extra header names this system uses, per kind and field (checked before the shared list). */
  aliases?: Partial<Record<ImportKind, Record<string, string[]>>>;
  /** Headers that on their own say which kind of file this is. */
  signatures?: Partial<Record<ImportKind, string[]>>;
}

/** lowercase, letters and digits only: "Total (Incl. Tax)" → "totalincltax". */
export function headerKey(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** The shared list: every header name we know for each field, across all systems. */
const SHARED: Record<ImportKind, Record<string, string[]>> = {
  customers: {
    ref: [
      'customerid',
      'simprocustomerid',
      'clientid',
      'accountingreference',
      'accountreference',
      'accountno',
      'customerref',
      'customernumber',
      'uuid',
      'id',
      'jobberclientid',
      'customercode',
    ],
    name: [
      'customername',
      'name',
      'fullname',
      'clientname',
      'client',
      'customer',
      'contactname',
      'displayname',
      'firstname+lastname',
      'forename+surname',
      'name+surname',
      'givenname+familyname',
      'clientfirstname+clientlastname',
    ],
    company_name: ['companyname', 'company', 'businessname', 'organisation', 'organization'],
    email: [
      'email',
      'emailaddress',
      'contactemail',
      'clientemail',
      'primaryemail',
      'customeremail',
      'emails',
    ],
    phone: [
      'phone',
      'phonenumber',
      'telephone',
      'primaryphone',
      'mainphone',
      'workphone',
      'homephone',
      'landline',
      'tel',
      'mainphones',
    ],
    mobile: ['mobile', 'mobilenumber', 'mobilephone', 'cell', 'cellphone', 'mobilephones'],
    address: ['address', 'fulladdress', 'physicaladdress', 'billingaddress', '@compose'],
    postcode: [
      'postcode',
      'postalcode',
      'physicaladdresspostalcode',
      'zippostalcode',
      'billingpostalcode',
      'billingzippostalcode',
      'zip',
      'postcodezip',
      'addresspostcode',
      'billingzipcode',
    ],
    notes: ['notes', 'note', 'privatenotes', 'comments'],
  },
  sites: {
    ref: [
      'siteid',
      'simprositeid',
      'propertyid',
      'jobberpropertyid',
      'workaddressid',
      'sitecode',
      'id',
    ],
    customer_ref: [
      'simprocustomerid',
      'customerid',
      'clientid',
      'accountingreference',
      'customercode',
    ],
    customer_name: [
      'customer',
      'customername',
      'client',
      'clientname',
      'landlordname+landlordsurname',
      'landlordcompanyname',
      'owner',
    ],
    customer_email: ['customeremail', 'clientemail', 'landlordemail'],
    site_name: ['sitename', 'propertyname', 'name', 'site'],
    address: ['siteaddress', 'fullpropertyaddress', 'propertyaddress', 'address', '@compose'],
    postcode: [
      'postcode',
      'sitepostcode',
      'postalcode',
      'siteaddresspostalcode',
      'zippostalcode',
      'zip',
    ],
    property_type: ['propertytype', 'buildingtype', 'sitetype'],
    notes: ['privatenotes', 'publicnotes', 'notes', 'accessnotes'],
  },
  jobs: {
    ref: ['jobid', 'uuid', 'id', 'generatedjobid', 'ref'],
    job_number: [
      'jobnumber',
      'jobno',
      'reference',
      'jobref',
      'jobreference',
      'generatedjobid',
      'number',
    ],
    title: [
      'jobtitle',
      'jobname',
      'title',
      'name',
      'summary',
      'briefdescription',
      'what',
      'work',
      // Many exports have no title, only a description: use it.
      'jobdescription',
      'description',
    ],
    description: [
      'description',
      'jobdescription',
      'overviewdescription',
      'instructions',
      'details',
      'workdonedescription',
      'notes',
    ],
    customer_ref: ['customerid', 'simprocustomerid', 'clientid', 'customercode', 'companyuuid'],
    customer_name: ['customer', 'customername', 'client', 'clientname', 'company', 'companyname'],
    customer_email: ['clientemail', 'customeremail', 'email'],
    customer_phone: ['clientphone', 'customerphone', 'phone'],
    address: [
      'jobaddress',
      'siteaddress',
      'fullpropertyaddress',
      'propertyaddress',
      'address',
      'where',
      'location',
      '@compose',
      'site',
      'sitename',
    ],
    status: ['status', 'jobstatus', 'stage', 'jobstage', 'state', 'deliveryandpaymentstatus'],
    // Not the created date: an open job with a start date goes in the diary.
    start_date: [
      'startdate',
      'scheduleddate',
      'scheduledstart',
      'scheduled',
      'bookeddate',
      'appointment',
      'when',
    ],
    end_date: ['enddate', 'duedate', 'finishdate', 'scheduledend'],
    completed_date: [
      'completeddate',
      'completiondate',
      'datecompleted',
      'completed',
      'finished',
      'closeddate',
    ],
    value: [
      'value',
      'jobvalue',
      'totalprice',
      'total',
      'quotedvalue',
      'totalinvoiceamount',
      'totalexcltax',
      'price',
    ],
    site_contact_name: ['sitecontact', 'sitecontactname', 'jobcontact', 'contact'],
    site_contact_phone: ['sitecontactphone', 'sitecontactmobile', 'jobcontactphone'],
    job_type: ['jobtype', 'category', 'category1', 'type', 'jobcategory'],
  },
  quotes: {
    number: [
      'quotenumber',
      'quoteno',
      'estimatenumber',
      'quoteref',
      'quotereference',
      'number',
      'reference',
      'documentnumber',
    ],
    ref: ['quoteid', 'id', 'uuid'],
    customer_ref: ['customerid', 'simprocustomerid', 'jobberclientid', 'clientid'],
    customer_name: [
      'customer',
      'customername',
      'client',
      'clientname',
      'clientfirstname+clientlastname',
      'contact',
      'contactname',
      'clientcompanyname',
    ],
    customer_email: ['clientemail', 'customeremail', 'email'],
    customer_phone: ['clientmainphone', 'clientmobilephone', 'customerphone', 'phone'],
    customer_address: ['customeraddress', 'billingaddress', 'clientaddress'],
    description: ['quotetitle', 'quotename', 'title', 'description', 'subject', 'summary'],
    date: [
      'quotedate',
      'date',
      'issueddate',
      'createddate',
      'datecreated',
      'created',
      'sentdate',
      'datesent',
    ],
    expiry_date: ['expirydate', 'validuntil', 'expires', 'duedate', 'expiry'],
    status: ['quotestatus', 'status', 'stage', 'state'],
    subtotal: [
      'subtotal',
      'totalexcltax',
      'totalexvat',
      'net',
      'netamount',
      'totalextax',
      'amountexvat',
      'totalexcvat',
    ],
    vat: ['vat', 'tax', 'taxamount', 'vatamount', 'totaltax'],
    total: [
      'total',
      'totalincltax',
      'totalincvat',
      'gross',
      'grossamount',
      'totalincludingtax',
      'amount',
      'totalprice',
    ],
    job_ref: ['jobnumber', 'jobno', 'job', 'jobreference'],
    notes: ['notes', 'quoteinternalnote', 'internalnotes'],
    item_description: [
      'lineitemname',
      'itemdescription',
      'linedescription',
      'itemname',
      'lineitem',
      'item',
    ],
    item_quantity: ['quantity', 'qty', 'lineitemquantity', 'itemquantity'],
    item_unit_price: ['unitprice', 'lineitemunitprice', 'itemunitprice', 'rate'],
    item_total: ['linetotal', 'lineitemtotal', 'itemtotal', 'lineamount'],
  },
  invoices: {
    number: [
      'invoicenumber',
      'invoiceno',
      'invoiceref',
      'invoicereference',
      'number',
      'reference',
      'documentnumber',
      'invnumber',
    ],
    ref: ['invoiceid', 'id', 'uuid'],
    customer_ref: ['customerid', 'simprocustomerid', 'jobberclientid', 'clientid'],
    customer_name: [
      'customer',
      'customername',
      'client',
      'clientname',
      'clientfirstname+clientlastname',
      'contact',
      'contactname',
      'clientcompanyname',
      'billto',
    ],
    customer_email: ['clientemail', 'customeremail', 'email'],
    customer_phone: ['clientmainphone', 'customerphone', 'phone'],
    customer_address: ['customeraddress', 'billingaddress', 'clientaddress', 'siteaddress'],
    description: ['invoicesubject', 'subject', 'title', 'description', 'summary', 'invoicetype'],
    date: [
      'invoicedate',
      'invoiceissueddate',
      'issueddate',
      'date',
      'dateissued',
      'createddate',
      'taxdate',
    ],
    due_date: ['duedate', 'invoiceduedate', 'paymentdue', 'due'],
    status: [
      'invoicestatus',
      'status',
      'deliveryandpaymentstatus',
      'paymentstatus',
      'state',
      'paid',
    ],
    subtotal: [
      'subtotal',
      'totalexcltax',
      'totalexvat',
      'net',
      'netamount',
      'totalextax',
      'amountexvat',
      'totalexcvat',
    ],
    vat: ['vat', 'tax', 'taxamount', 'vatamount', 'totaltax'],
    total: [
      'total',
      'totalincltax',
      'totalincludingtax',
      'totalincvat',
      'gross',
      'grossamount',
      'invoicetotal',
      'amount',
      'totalinvoiceamount',
    ],
    amount_paid: ['amountpaid', 'paid', 'paidamount', 'paymentamount', 'totalpaid'],
    amount_due: ['amountdue', 'balance', 'balancedue', 'outstanding', 'amountoutstanding', 'due'],
    paid_date: ['paiddate', 'paymentdate', 'datepaid', 'lastpaymentdate'],
    job_ref: ['jobnumber', 'jobno', 'job', 'jobreference'],
    notes: ['notes', 'internalnotes'],
    item_description: [
      'lineitemname',
      'itemdescription',
      'linedescription',
      'itemname',
      'lineitem',
      'item',
    ],
    item_quantity: ['quantity', 'qty', 'lineitemquantity', 'itemquantity'],
    item_unit_price: ['unitprice', 'lineitemunitprice', 'itemunitprice', 'rate'],
    item_total: ['linetotal', 'lineitemtotal', 'itemtotal', 'lineamount'],
  },
  price_book: {
    code: [
      'itemcode',
      'productcode',
      'partnumber',
      'sku',
      'code',
      'itemnumber',
      'suppliersku',
      'partno',
    ],
    name: [
      'productname',
      'name',
      'itemname',
      'description',
      'productdescription',
      'item',
      'partname',
    ],
    unit: ['unitofmeasure', 'unitofmeasurement', 'unit', 'uom'],
    buy: ['buyprice', 'costprice', 'cost', 'tradeprice', 'purchaseprice', 'unitcost'],
    sell: [
      'sellprice',
      'standard',
      'salesprice',
      'saleprice',
      'price',
      'unitprice',
      'retailprice',
      'sellpricestandard',
    ],
    markup: ['markup', 'markuppercent', 'markuppercentage'],
    category: ['category', 'group', 'productgroup', 'type'],
    supplier: ['supplier', 'manufacturer', 'brand', 'suppliername'],
  },
  staff: {
    ref: ['employeeid', 'simproemployeeid', 'staffid', 'userid', 'id'],
    name: [
      'employeename',
      'name',
      'fullname',
      'staffname',
      'firstname+lastname',
      'forename+surname',
    ],
    email: ['email', 'emailaddress', 'workemail'],
    phone: ['mobilephone', 'mobile', 'phone', 'phonenumber'],
    role: ['position', 'role', 'jobtitle', 'title', 'trade'],
    hourly_rate: ['payrate', 'hourlyrate', 'rateperhour', 'rate', 'costrate'],
    start_date: [
      'dateofcommencement',
      'startdate',
      'started',
      'joined',
      'joindate',
      'employmentstartdate',
    ],
  },
  assets: {
    ref: ['assetid', 'id', 'equipmentid'],
    name: ['assetname', 'name', 'description', 'equipmentname', 'assettype', 'item', 'tool'],
    category: ['category', 'assettype', 'type', 'equipmenttype', 'group'],
    serial_number: ['serialnumber', 'serialno', 'serial'],
    tool_number: ['assetnumber', 'assetno', 'toolnumber', 'tagnumber', 'barcode', 'asset'],
    purchase_date: ['purchasedate', 'boughton', 'bought', 'dateofpurchase', 'servicestartdate'],
    purchase_price: ['purchaseprice', 'cost', 'value', 'price'],
    pat_due: ['patdue', 'nextpat', 'patduedate', 'nextpattest'],
    calibration_due: [
      'calibrationdue',
      'nextcalibration',
      'calibrationduedate',
      'nextservice',
      'nextservicedate',
    ],
    notes: ['notes', 'comments'],
  },
};

export const SOURCES: SourceInfo[] = [
  {
    key: 'tradify',
    label: 'Tradify',
    dateOrder: 'dmy',
    helpUrl:
      'https://help.tradifyhq.com/hc/en-us/articles/4402065079705-Exporting-Or-Deleting-Your-Data-From-Tradify',
    steps: [
      'Customers: Customers, then Options, then Export Customers to File.',
      'Sites: Customers, then Options, then Export Customer Sites to File.',
      'Jobs: Jobs, then Options, then Export Jobs to File. Pick no jobs to get every job in the filter.',
      'Quotes and invoices: tick them on the list and press Export.',
      'Price list: Settings, then Price List, then Options, then Export All Price Lists.',
    ],
    aliases: {
      jobs: { title: ['description'] },
      price_book: { name: ['description'], sell: ['standard'] },
    },
    signatures: { sites: ['sitename'], price_book: ['unitofmeasure', 'buyprice'] },
  },
  {
    key: 'fergus',
    label: 'Fergus',
    dateOrder: 'dmy',
    helpUrl: 'https://help.fergus.com/en/articles/1895405-overview-of-commonly-used-reports',
    steps: [
      'Invoices: Reports, then Customer Invoice Report, then download CSV.',
      'Jobs: Reports, then WIP Report, then download CSV.',
      'Price book: Settings, then Price Books, then export the book.',
      'Customers: Fergus has no customer export button. Ask us to move you across and we will get them out with you.',
    ],
    aliases: {
      invoices: {
        status: ['deliveryandpaymentstatus'],
        total: ['totalincludingtax'],
        description: ['invoicetype'],
        customer_address: ['siteaddress'],
      },
      price_book: { name: ['productname', 'productdescription'] },
    },
    signatures: { invoices: ['invoicenumber'], price_book: ['productcode', 'costprice'] },
  },
  {
    key: 'powered_now',
    label: 'Powered Now',
    dateOrder: 'dmy',
    helpUrl: 'https://support.powerednow.com/en/knowledge/how-do-i-export-my-contacts',
    steps: [
      'Customers: Contacts, then Export Contacts, then choose Customer.',
      'Invoices and quotes: Reports & Finances, then Accounts Export.',
      'Products: Settings, then Products & Auto-Complete, then Product Catalogue, then Export.',
    ],
    aliases: {
      customers: { name: ['forename+surname'], company_name: ['companyname'] },
    },
    signatures: { customers: ['forename', 'surname'] },
  },
  {
    key: 'simpro',
    label: 'simPRO',
    dateOrder: 'dmy',
    helpUrl: 'https://helpguide.simprogroup.com/articles/#!help-guide/export-customers',
    steps: [
      'Use the Export menu: Customers, Sites, Catalogue, Employees and Assets each export as CSV.',
      'Quotes: set up the Quote Export (CSV) form under System, Setup, Forms Setup.',
      'Jobs and invoices: run the job and invoice reports and export them as CSV.',
    ],
    aliases: {
      jobs: { title: ['jobname'], description: ['overviewdescription'], address: ['sitename'] },
      quotes: { description: ['quotename'] },
      price_book: { name: ['description'], buy: ['costprice'] },
    },
    signatures: {
      customers: ['simprocustomerid'],
      sites: ['simprositeid'],
      staff: ['simproemployeeid', 'employeename'],
      price_book: ['partnumber'],
      assets: ['assetid'],
    },
  },
  {
    key: 'servicem8',
    label: 'ServiceM8',
    dateOrder: 'dmy',
    helpUrl:
      'https://support.servicem8.com/help-center/tips-trick-more/more/how-to-download-a-backup-of-your-servicem8-data',
    steps: [
      'Settings, then ServiceM8 Account, then Download account backup, then Create Backup.',
      'Open the backup and choose the clients, jobs and materials files here.',
      'If the backup will not open, send it to us with "Move me across for free".',
    ],
    aliases: {
      jobs: {
        title: ['jobdescription'],
        address: ['jobaddress'],
        job_number: ['generatedjobid'],
        value: ['totalinvoiceamount'],
        start_date: ['date'],
      },
      price_book: { code: ['itemnumber'], sell: ['price'], buy: ['cost'] },
    },
    signatures: { jobs: ['generatedjobid'] },
  },
  {
    key: 'jobber',
    label: 'Jobber',
    dateOrder: 'dmy',
    helpUrl: 'https://help.getjobber.com/en/articles/export-client-information/',
    steps: [
      'Clients: Clients, then More Actions, then Export Clients (CSV).',
      'Jobs, quotes and invoices: open each report, then Export to CSV. The file comes by email.',
    ],
    // "Quote #" and "Invoice #" read as quote / invoice once the # is dropped.
    aliases: { quotes: { number: ['quote'] }, invoices: { number: ['invoice'] } },
    signatures: { quotes: ['quotenumber', 'quote'], invoices: ['invoicenumber', 'invoice'] },
  },
  {
    key: 'commusoft',
    label: 'Commusoft',
    dateOrder: 'dmy',
    helpUrl:
      'https://help.commusoft.com/en/articles/471416-how-does-commusoft-handle-data-exports-to-excel-based-on-file-size',
    steps: [
      'Reports: open the customers, work addresses, jobs and invoices reports and press Download to Excel.',
      'Each report exports up to 5,000 rows at a time, so a big book may come in several files.',
    ],
    aliases: {
      customers: { name: ['name+surname'], ref: ['accountingreference'], phone: ['telephone'] },
      sites: { customer_name: ['landlordname+landlordsurname', 'landlordcompanyname'] },
    },
    signatures: { sites: ['landlordname', 'uprn'] },
  },
  {
    key: 'joblogic',
    label: 'Joblogic',
    dateOrder: 'dmy',
    helpUrl: 'https://support.joblogic.com/docs/dynamic-reports',
    steps: [
      'Reports, then Dynamic Reports. Run All Customers, All Sites, All Jobs, All Quotes, All Invoices and Asset Register.',
      'Preview each one, then Share to download it as CSV.',
    ],
    aliases: { jobs: { value: ['quotedvalue'] } },
    signatures: { assets: ['assetnumber'] },
  },
  {
    key: 'generic',
    label: 'Another system or a spreadsheet',
    dateOrder: 'dmy',
    steps: [
      'Export each list as CSV or Excel: customers, jobs, quotes, invoices, price list, staff, kit.',
      'One list per file, with column names in the first row.',
      'You will match the columns to ours before anything is saved.',
    ],
  },
];

export const sourceInfo = (k: SourceSystem) =>
  SOURCES.find((s) => s.key === k) ?? SOURCES[SOURCES.length - 1];

/** Kind hints from headers alone, in order of how specific they are. */
const KIND_HINTS: [ImportKind, string[]][] = [
  [
    'invoices',
    ['invoicenumber', 'invoiceno', 'invoicedate', 'invoicestatus', 'amountdue', 'invoicetotal'],
  ],
  ['quotes', ['quotenumber', 'quoteno', 'quotestatus', 'quotetitle', 'quotename', 'validuntil']],
  [
    'staff',
    [
      'employeename',
      'simproemployeeid',
      'dateofcommencement',
      'payrate',
      'position',
      'rateperhour',
      'hourlyrate',
    ],
  ],
  ['assets', ['assetid', 'assetnumber', 'serialnumber', 'calibrationdue', 'patdue', 'assettype']],
  [
    'price_book',
    [
      'itemcode',
      'productcode',
      'partnumber',
      'buyprice',
      'costprice',
      'unitofmeasure',
      'sku',
      'tradeprice',
    ],
  ],
  ['sites', ['sitename', 'simprositeid', 'propertyid', 'landlordname', 'uprn']],
  [
    'jobs',
    [
      'jobnumber',
      'jobno',
      'jobname',
      'jobtitle',
      'jobstatus',
      'jobaddress',
      'generatedjobid',
      'datelogged',
    ],
  ],
  [
    'customers',
    [
      'customername',
      'clientname',
      'forename',
      'surname',
      'firstname',
      'companyname',
      'email',
      'emailaddress',
      'contactemail',
      'client',
    ],
  ],
];

/** Parts of a joined alias that may be missing ("Title", "Address Line 3"). */
const OPTIONAL_PARTS = new Set([
  'title',
  'addressline2',
  'addressline3',
  'address2',
  'address3',
  'street2',
]);

/** Address columns in reading order, for building one address from several. */
const ADDRESS_PARTS = [
  'addressstreet',
  'siteaddressstreet',
  'physicaladdressstreet',
  'billingstreet',
  'billingstreet1',
  'streetaddress',
  'street',
  'street1',
  'address1',
  'addressline1',
  'billingstreet2',
  'street2',
  'address2',
  'addressline2',
  'address3',
  'addressline3',
  'siteaddresscity',
  'physicaladdresscity',
  'billingcity',
  'addresscity',
  'town',
  'city',
  'siteaddressregion',
  'physicaladdressregion',
  'addressstate',
  'billingprovince',
  'billingstate',
  'county',
  'region',
  'stateprovince',
];

/** Try one alias against the file's headers. "a+b" means several columns joined. */
function resolveAlias(
  alias: string,
  headerKeys: Map<string, string>,
  used: Set<string>
): string[] | null {
  if (alias === '@compose') {
    const seen = new Set<string>();
    const cols: string[] = [];
    for (const p of ADDRESS_PARTS) {
      const h = headerKeys.get(p);
      if (h && !seen.has(h) && !used.has(h)) {
        seen.add(h);
        cols.push(h);
      }
    }
    return cols.length ? cols : null;
  }
  const parts = alias.split('+');
  const cols: string[] = [];
  for (const p of parts) {
    const h = headerKeys.get(p);
    if (h) cols.push(h);
    else if (!OPTIONAL_PARTS.has(p)) return null;
  }
  // A lone optional part ("Title" by itself) is not a name.
  if (!cols.length || (parts.length > 1 && cols.every((c) => OPTIONAL_PARTS.has(headerKey(c)))))
    return null;
  return cols;
}

export function guessMap(kind: ImportKind, headers: string[], source: SourceSystem): ColumnMap {
  const keys = new Map<string, string>();
  for (const h of headers) if (!keys.has(headerKey(h))) keys.set(headerKey(h), h);
  // "Sell Price (Standard)" style tier columns.
  for (const h of headers) {
    const k = headerKey(h);
    if (k.startsWith('sellprice') && !keys.has('sellprice')) keys.set('sellprice', h);
  }
  const extra = sourceInfo(source).aliases?.[kind] ?? {};
  const shared = SHARED[kind];
  const map: ColumnMap = {};
  const used = new Set<string>();
  for (const def of KIND_FIELDS[kind]) {
    const aliases = [...(extra[def.key] ?? []), ...(shared[def.key] ?? [])];
    for (const a of aliases) {
      const cols = resolveAlias(a, keys, used);
      if (!cols) continue;
      // Do not give one column to two fields, except the customer link fields.
      const free = cols.filter((c) => !used.has(c) || def.key.startsWith('customer_'));
      if (!free.length) continue;
      map[def.key] = free;
      free.forEach((c) => used.add(c));
      break;
    }
  }
  return map;
}

function coverage(kind: ImportKind, headers: string[], source: SourceSystem): number {
  const map = guessMap(kind, headers, source);
  const req = KIND_FIELDS[kind].filter((f) => f.required);
  if (!req.every((f) => map[f.key]?.length)) return -1;
  return Object.keys(map).length;
}

export function detectKind(
  headers: string[],
  source: SourceSystem
): { kind: ImportKind | null; confidence: number } {
  const keys = new Set(headers.map(headerKey));
  const sig = sourceInfo(source).signatures ?? {};
  for (const [kind, hs] of Object.entries(sig) as [ImportKind, string[]][]) {
    if (hs.some((h) => keys.has(h))) return { kind, confidence: 0.9 };
  }
  const scores = KIND_HINTS.map(([kind, hs]) => ({
    kind,
    hinted: hs.some((h) => keys.has(h)),
    cover: coverage(kind, headers, source),
  }));
  const hinted = scores.find((x) => x.hinted);
  const best = [...scores].sort((a, b) => b.cover - a.cover)[0];
  // Take the header hint unless another kind fits the columns far better
  // (a "Client, What, Where, When" work list is jobs, not customers).
  if (hinted && hinted.cover >= 0 && !(best.cover >= hinted.cover + 3)) {
    return { kind: hinted.kind, confidence: 0.75 };
  }
  if (best && best.cover >= 2) return { kind: best.kind, confidence: hinted ? 0.6 : 0.5 };
  if (hinted) return { kind: hinted.kind, confidence: 0.4 };
  return { kind: null, confidence: 0 };
}

/** For a parsed file: the best kind and the column match to start from. */
export function autoMap(file: ParsedFile, source: SourceSystem) {
  const { kind, confidence } = detectKind(file.headers, source);
  return { kind, confidence, map: kind ? guessMap(kind, file.headers, source) : {} };
}

/**
 * Some exports put quotes and invoices in one file with a type column
 * (Powered Now's Accounts Export does). Split those into one file per kind;
 * rows of other types (supplier bills, credit notes, expenses) are left out
 * and counted.
 */
export function splitByDocType(
  file: ParsedFile
): { files: { file: ParsedFile; kind: ImportKind }[]; dropped: number } | null {
  const typeCol = file.headers.find((h) =>
    ['type', 'documenttype', 'doctype', 'transactiontype', 'recordtype'].includes(headerKey(h))
  );
  if (!typeCol) return null;
  const quotes: Record<string, unknown>[] = [];
  const invoices: Record<string, unknown>[] = [];
  let dropped = 0;
  for (const r of file.rows) {
    const t = String(r[typeCol] ?? '').toLowerCase();
    if (/supplier|purchase|bill|expense|credit/.test(t)) dropped++;
    else if (/quote|estimate/.test(t)) quotes.push(r);
    else if (/invoice/.test(t)) invoices.push(r);
    else dropped++;
  }
  if (!quotes.length || !invoices.length) return null;
  return {
    files: [
      {
        file: { ...file, id: `${file.id}-q`, name: `${file.name} (quotes)`, rows: quotes },
        kind: 'quotes',
      },
      {
        file: { ...file, id: `${file.id}-i`, name: `${file.name} (invoices)`, rows: invoices },
        kind: 'invoices',
      },
    ],
    dropped,
  };
}
