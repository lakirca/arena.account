export class Invoice {
  app_uuid: string;
  invoice_amount: any;
  invoice_coupon: any;
  invoice_date: any;
  invoice_discount: any;
  invoice_status: string;
  invoice_type: { type_uuid: any; type_name: any; type_code: any; app: any };
  invoice_uuid: any;
  payment_detail: {
    payment_response: any;
    payment_status: string;
  };
  stamp_created: any;
  stamp_created_by: {
    name: string;
    uuid: string;
  };
  stamp_discount: any;
  stamp_discount_by: { ame: string; uuid: any };
  stamp_updated: any;
  stamp_updated_by: {
    name: string;
  };
  transactions: [
    {
      invoice_uuid: any;
      stamp_created: any;
      stamp_created_by: {
        name: string;
        uuid: string;
      };
      stamp_discount: any;
      stamp_discount_by: {
        name: string;
        uuid: string;
      };
      stamp_updated: any;
      stamp_updated_by: {
        name: string;
        uuid: string;
      };
      transaction_cost: any;
      transaction_cost_total: any;
      transaction_discount: any;
      transaction_memo: any;
      transaction_name: string;
      transaction_quantity: any;
      transaction_status: string;
      transaction_type: {
        app_uuid: string;
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
        type_code: string;
        type_name: string;
        type_uuid: string;
      };

      transaction_uuid: string;
    }
  ];
  user_uuid: string;
}
