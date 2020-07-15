export class Address {
  user?: string;
  postal?: string;
  postal_uuid: string;
  postal_type: string;
  postal_street: string;
  postal_city: string;
  postal_zipcode: string;
  postal_country: string;
  flag_primary: number = 0;
  stamp_created: any;
  stamp_created_by: { uuid: string };
  stamp_updated: any;
  stamp_updated_by: { uuid: string };
}
