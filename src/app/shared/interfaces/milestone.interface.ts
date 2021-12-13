export interface KpiResults {
    kpi: string;
    target: string;
    unit: string;
    actual: string;
    pctOfTotal: string;
  }

export interface Milestone{
  mileID: string;
  achieveText: string;
  qty: string;
  kpiID: string
}

export interface Kpi{
  objective: string;
  qty: string;
  achieveQty: string;
  uID: string;
  kpiID: string;
  kids: {
    has_milestones?: {
      records: Milestone[];
    }
  }
}