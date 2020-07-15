export class Permission {
  permission_uuid: string;
  permission_name: string;
  permission_memo: string;
  permission_value: number;
  stamp_created: any;
  stamp_created_by: string;
  stamp_updated: any;
  stamp_updated_by: string;
  groups_permissions: {
    data: [
      {
        group_uuid: string;
        auth_uuid: string;
        group_name: string;
        group_memo: string;
        stamp_created: any;
        stamp_created_by: {
          uuid: string;
        };
        stamp_updated: any;
        stamp_updated_by: {
          uuid: string;
        };
        permission: {
          data: {
            permission_uuid: string;
            permission_value: any;
          };
        };
      }
    ];
  };
}
