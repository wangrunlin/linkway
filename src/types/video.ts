export interface VideoFields {
  datePublished: number;
  id: string;
  metadata: string;
  thumbnail: string;
  title: string;
  type: string;
  url: string;
}

export interface VideoRecord {
  fields: VideoFields;
  id: string;
  record_id: string;
}

export interface TableResponse {
  data?: {
    has_more: boolean;
    page_token?: string;
    items: VideoRecord[];
  };
}
