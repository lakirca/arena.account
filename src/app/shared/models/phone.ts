export class Phone {
  phone_type: string;
  phone_number: string;
  flag_primary: any = false;
  stamp_created: any;
  stamp_created_by: { uuid: string };
  stamp_updated: any;
  stamp_updated_by: { uuid: string };
}
