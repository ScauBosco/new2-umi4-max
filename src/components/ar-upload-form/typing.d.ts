export interface createFormType {
  code: string;
  componentName: string;
  configs: [];
  fileUrl: string;
  preRelease: string;
  rollbackTag: string;
  segment: any[];
  sign: string;
  ssrbTicket: string;
  summary: string;
  version: string;
}
export interface ARUploadFormProps {
  // onConfirm?: () => void;
  isPopup?: boolean;
}
