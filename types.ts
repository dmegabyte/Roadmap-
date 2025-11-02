import React from 'react';

export interface CodeSnippet {
  language: string;
  code: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface StageDetail {
  title: string;
  content: string;
}

export interface DetailedContent {
  title: string;
  sections: {
    title: string;
    type: 'text' | 'architecture' | 'code' | 'table' | 'list';
    content?: string[];
    architecture?: {
      steps: string[];
    };
    codeSnippet?: CodeSnippet;
    table?: TableData;
    list?: string[];
  }[];
}

export interface Stage {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string[];
  details?: (string | StageDetail)[];
  codeSnippet?: CodeSnippet;
  table?: TableData;
  dependencies?: string[];
  detailedContent?: DetailedContent;
}

export interface Quarter {
  id: number;
  title: string;
  shortTitle: string;
  stages: Stage[];
}

export interface Persona {
  name: string;
  description: string;
}

export interface PrioritizationItem {
  feature: string;
  rice: number;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface Kpi {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
}

export interface ProductStrategyContent {
  title: string;
  subtitle: string;
  vision: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    content: string[];
    ethics: string;
  };
  personas: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: Persona[];
  };
  prioritization: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    items: PrioritizationItem[];
  };
  dialogueArchitecture: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  kpis: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: Kpi[];
  };
}