export class UserProfile {
  aliases: [
    {
      alias_uuid: string;
      flag_primary: any;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      user_alias: string;
      user_uuid: string;
    }
  ];

  avatar: string;
  bankings: [
    {
      account_number: string;
      account_type: string;
      bank_name: string;
      bank_uuid: string;
      flag_primary: any;
      routing_number: string;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      user_uuid: string;
    }
  ];
  emails: [
    {
      flag_primary: any;
      flag_verified: any;
      user_auth_email: string;
    }
  ];
  name: string;
  name_first: string;
  name_last: string;
  name_middle: any;

  paypals: [
    {
      flag_primary: any;
      paypal: string;
      paypal_uuid: string;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      user_uuid: string;
    }
  ];
  phones: [
    {
      flag_primary: any;
      phone_number: string;
      phone_type: string;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      user_uuid: string;
    }
  ];
  postals: [
    {
      flag_primary: any;
      postal_city: string;
      postal_country: string;
      postal_street: string;
      postal_type: string;
      postal_uuid: string;
      postal_zipcode: string;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      user_uuid: string;
    }
  ];
  stamp_created: any;
  stamp_created_by: {
    name: string;
    uuid: string;
  };
  stamp_updated: any;
  stamp_updated_by: {
    name: string;
    uuid: string;
  };
  user_uuid: string;
  alias?: string;
  email?: string;
  phone?: string;
  postal?: {
    flag_primary: any;
    postal_city: string;
    postal_country: string;
    postal_street: string;
    postal_type: string;
    postal_uuid: string;
    postal_zipcode: string;
    stamp_created: any;
    stamp_created_by: { uuid: string; name: string };
    stamp_updated: any;
    stamp_updated_by: { uuid: string; name: string };
    user_uuid: string;
  };
  bank?: {
    account_number: string;
    account_type: string;
    bank_name: string;
    bank_uuid: string;
    flag_primary: any;
    routing_number: string;
    stamp_created: any;
    stamp_created_by: { uuid: string; name: string };
    stamp_updated: any;
    stamp_updated_by: { uuid: string; name: string };
    user_uuid: string;
  };
}
