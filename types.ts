export type RoleCategory = '行銷' | '業務' | '工程師' | '產品經理' | '人力資源' | '經營管理' | '通用職能' | '客戶關係團隊';
export type PurposeCategory = '文案生成' | '數據分析' | '程式碼輔助' | '策略規劃' | '腦力激盪' | '內容總結' | '翻譯潤色';
export type Theme = 'light' | 'dark' | 'system';

export interface Prompt {
  id: number;
  title: string;
  content: string;
  description: string;
  variables: string[];
  roleCategory: RoleCategory;
  purposeCategory: PurposeCategory;
  sourceUrl: string;
  usageInstructions: string;
  exampleOutput: string;
  tags: string[];
  saves: number;
  isEditorsPick: boolean;
  isWeeklyHot: boolean;
  createdAt: string; // ISO 8601 date string
}