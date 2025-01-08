import { LinkWayResource } from "@/types";

export type Column = {
  title: keyof LinkWayResource;
  uidt?: UIDT;
  description?: string;

  // string (FieldTypeDefaultValue)
  // Column Default Value. Defaults to NULL
  cdf?: string;

  // boolean (FieldTypePrimaryValue)
  // Set this column as primary value. Defaults to FALSE
  pv?: boolean;

  // boolean (FieldTypeRequired)
  // Set this column as required. Defaults to FALSE
  rqd?: boolean;

  // object (FieldTypeMetaSelect)
  // Select options for this column
  colOptions?: {
    options: {
      title: string;

      // example: #FF0000
      color?: string;
    }[];
  };
};

export type TableSchema = {
  table_name: string;
  title: string;
  columns: Column[];
  description?: string;
};

export type UIDT =
  | "SingleLineText"
  | "LongText"
  | "PhoneNumber"
  | "Email"
  | "URL"
  | "Number"
  | "Decimal"
  | "Percent"
  | "Currency"
  | "Duration"
  | "Date"
  | "Time"
  | "DateTime"
  | "Year"
  | "SingleSelect"
  | "MultiSelect"
  | "User"
  | "Attachment"
  | "Checkbox"
  | "Rating"
  | "Button"
  | "Formula"
  | "Barcode"
  | "QrCode"
  | "Links"
  | "LinkToAnotherRecord"
  | "Lookup"
  | "Rollup"
  | "ID"
  | "CreatedTime"
  | "LastModifiedTime"
  | "CreatedBy"
  | "LastModifiedBy"
  | "GeoData"
  | "Geometry"
  | "JSON"
  | "SpecificDBType";
