import { Permission } from './permission';

export class Group {
  group_uuid: string;
  auth_uuid: string;
  group_name: string;
  group_memo: string;
  stamp_created: any;
  stamp_created_by: string;
  stamp_updated: any;
  stamp_updated_by: string;
  users: any[];
  permissions: { data: Permission[] };
}
