import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  Input,
  ViewChild
} from "@angular/core";
import { Chart } from "chart.js";
import { DateTime } from "luxon";

@Component({
  selector: "mixed-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./mixed-chart.component.html",
  styleUrls: ["./mixed-chart.component.scss"]
})
export class MixedChartComponent implements OnInit, OnChanges {
  @Input() hxData?: object[];

  displayTitles: boolean = true;
  width: number = 300; // Default chart width
  height: number = 300; // Default chart height

  mixedChart: any; // Generated SVG reference
  @ViewChild("hxChart", { static: true }) chartContainer: ElementRef;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createChart(this.hxData);
  }

  // Load data when reference updates
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.updateChart(changes.data.currentValue);
    }
  }

  private createChart(data: object) {
    // Clear any existing SVG
    this.removeChart();

    var reportAlign: any = data;
    var labels: string[] = [];
    var budgetData: number[] = [];
    var actualData: number[] = [];

    // Create dataset for chart
    reportAlign.forEach(record => {
      // Use date for label
      let prettyLabel: string = DateTime.fromISO(record.reportDate, {
        zone: "utc"
      }).toLocaleString();
      // Load arrays for dataset
      labels.push(prettyLabel);
      budgetData.push(record.budgetAmount);
      actualData.push(record.actualAmount);
    });

    var hxGraph: object = {
      datasets: [
        {
          label: "Target",
          data: budgetData,
          type: "line"
        },
        {
          label: "Actual",
          data: actualData
        }
      ],
      labels: labels
    };

    this.mixedChart = new Chart(this.chartContainer.nativeElement, {
      type: "bar",
      data: hxGraph,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit:5
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            borderColor: "#58A6DB"
          },
          line: {
            fill: false,
            borderColor: "#58A6DB"
          }
        }
      }
    });
  }

  // Transition data changes for existing chart
  private updateChart(data: object) {
    // Check for existing chart reference
    if (this.mixedChart) {
      this.createChart(data);
      return;
    }
  }

  // Remove SVG elements inside component context
  private removeChart() {
    // Clean up chart
  }
}
