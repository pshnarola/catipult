import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  Input
} from "@angular/core";
import * as D3 from "d3";
import { bullet } from "d3v4-bullet";

@Component({
  selector: "bullet-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./bullet-chart.component.html",
  styleUrls: ["./bullet-chart.component.scss"]
})
export class BulletChartComponent implements OnInit, OnChanges {
  @Input() hxData?: object[];

  displayTitles: boolean = true;
  width: number = 160; // Default chart width
  height: number = 20; // Default chart height

  bullet: any; // D3 Bullet reference
  bulletChart: any; // Generated SVG reference
  chartContainer: any; // SVG reference for component

  constructor(private element: ElementRef) {
    this.chartContainer = this.element.nativeElement;
  }

  ngOnInit() {
    this.createChart(this.hxData);
  }

  // Load data when reference updates
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.updateChart(changes.data.currentValue);
    }
  }

  private createChart(data: object[]) {
    // Clear any existing SVG
    this.removeChart();

    // Init bullet chart
    this.bullet = bullet()
      .width(this.width)
      .height(this.height);

    // Add data and render
    this.bulletChart = D3.select(this.chartContainer)
      .selectAll("svg")
      .data(data)
      .enter()
      .append("svg")
      .attr("class", "bullet")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .call(this.bullet);
  }

  // Transition data changes for existing chart
  private updateChart(data: object[]) {
    // Check for existing chart reference
    if (this.bulletChart) {
      this.createChart(data);
      return;
    }

    this.bulletChart.datum(data).call(this.bullet.duration(1000));
  }

  // Remove SVG elements inside component context
  private removeChart() {
    D3.select(this.chartContainer)
      .select("svg")
      .remove();
  }
}
