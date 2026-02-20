/*message.ts*/

export class Message {
  constructor(
    public readonly event_id: string,
    public readonly event_code: string,
    public readonly message_type: 'SMS' | 'WHATSAPP',
    public readonly message_payload: {
      to: string;
      body: string;
      [key: string]: any;
    },
    public readonly message_status: 'PENDING' | 'DELIVERED',
    public readonly message_delivered_at?: Date,
    public readonly message_retry_count?: number,
    public readonly message_error_flow?: string,
    public readonly audit_state?: string,
    public readonly audit_insert_user?: string,
    public readonly audit_insert_date?: Date,
  ) {}
}
